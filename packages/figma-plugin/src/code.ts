type UIMessage =
  | { type: 'scan' }
  | { type: 'notify'; message: string; isError?: boolean }
  | { type: 'close' };

figma.showUI(__html__, {
  width: 440,
  height: 580,
  title: 'ddingdong Icon Sync',
});

figma.ui.onmessage = async (msg: UIMessage) => {
  switch (msg.type) {
    case 'scan':
      await handleScan();
      break;
    case 'notify':
      figma.notify(msg.message, { error: msg.isError });
      break;
    case 'close':
      figma.closePlugin();
      break;
  }
};

function findFrameAncestor(node: SceneNode): SceneNode {
  let current: BaseNode = node;
  while (current.parent && current.parent.type !== 'PAGE') {
    current = current.parent;
    if (
      current.type === 'FRAME' ||
      current.type === 'COMPONENT' ||
      current.type === 'COMPONENT_SET'
    ) {
      return current as SceneNode;
    }
  }
  return node;
}

async function handleScan() {
  try {
    const page = figma.currentPage;

    const selected: SceneNode[] =
      page.selection.length > 0
        ? [...page.selection]
        : (page.children as SceneNode[]).filter(
            (n) =>
              n.type === 'FRAME' ||
              n.type === 'COMPONENT' ||
              n.type === 'COMPONENT_SET',
          );

    if (selected.length === 0) {
      figma.ui.postMessage({
        type: 'scan-error',
        message:
          '내보낼 프레임이 없습니다.\n아이콘 프레임을 선택하거나 아이콘 페이지로 이동해 주세요.',
      });
      return;
    }

    // 벡터·그룹 등 내부 요소 선택 시 부모 Frame/Component로 올라감
    const resolved = selected.map(findFrameAncestor);
    const unique = [...new Map(resolved.map((n) => [n.id, n])).values()];

    const icons: { name: string; svgBytes: number[] }[] = [];
    const failed: string[] = [];

    for (const node of unique) {
      try {
        const bytes = await node.exportAsync({ format: 'SVG' });
        icons.push({ name: node.name, svgBytes: Array.from(bytes) });
      } catch (e) {
        const reason = e instanceof Error ? e.message : String(e);
        failed.push(`${node.name} (${node.type}): ${reason}`);
      }
    }

    if (icons.length === 0) {
      figma.ui.postMessage({
        type: 'scan-error',
        message: `export 실패 (${failed.length}개): ${failed.join(', ')}`,
      });
      return;
    }

    figma.ui.postMessage({ type: 'scan-done', icons });
  } catch (e) {
    figma.ui.postMessage({
      type: 'scan-error',
      message: `스캔 오류: ${e instanceof Error ? e.message : String(e)}`,
    });
  }
}
