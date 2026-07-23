"use strict";
(() => {
  // src/code.ts
  figma.showUI(__html__, {
    width: 440,
    height: 580,
    title: "ddingdong Icon Sync"
  });
  figma.ui.onmessage = async (msg) => {
    switch (msg.type) {
      case "scan":
        await handleScan();
        break;
      case "notify":
        figma.notify(msg.message, { error: msg.isError });
        break;
      case "close":
        figma.closePlugin();
        break;
    }
  };
  function findFrameAncestor(node) {
    let current = node;
    while (current.parent && current.parent.type !== "PAGE") {
      current = current.parent;
      if (current.type === "FRAME" || current.type === "COMPONENT" || current.type === "COMPONENT_SET") {
        return current;
      }
    }
    return node;
  }
  async function handleScan() {
    try {
      const page = figma.currentPage;
      const selected = page.selection.length > 0 ? [...page.selection] : page.children.filter(
        (n) => n.type === "FRAME" || n.type === "COMPONENT" || n.type === "COMPONENT_SET"
      );
      if (selected.length === 0) {
        figma.ui.postMessage({
          type: "scan-error",
          message: "\uB0B4\uBCF4\uB0BC \uD504\uB808\uC784\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.\n\uC544\uC774\uCF58 \uD504\uB808\uC784\uC744 \uC120\uD0DD\uD558\uAC70\uB098 \uC544\uC774\uCF58 \uD398\uC774\uC9C0\uB85C \uC774\uB3D9\uD574 \uC8FC\uC138\uC694."
        });
        return;
      }
      const resolved = selected.map(findFrameAncestor);
      const unique = [...new Map(resolved.map((n) => [n.id, n])).values()];
      const icons = [];
      const failed = [];
      for (const node of unique) {
        try {
          const bytes = await node.exportAsync({ format: "SVG" });
          icons.push({ name: node.name, svgBytes: Array.from(bytes) });
        } catch (e) {
          const reason = e instanceof Error ? e.message : String(e);
          failed.push(`${node.name} (${node.type}): ${reason}`);
        }
      }
      if (icons.length === 0) {
        figma.ui.postMessage({
          type: "scan-error",
          message: `export \uC2E4\uD328 (${failed.length}\uAC1C): ${failed.join(", ")}`
        });
        return;
      }
      figma.ui.postMessage({ type: "scan-done", icons });
    } catch (e) {
      figma.ui.postMessage({
        type: "scan-error",
        message: `\uC2A4\uCE94 \uC624\uB958: ${e instanceof Error ? e.message : String(e)}`
      });
    }
  }
})();
