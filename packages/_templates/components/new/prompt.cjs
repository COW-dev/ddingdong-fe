const toPascalCase = (str) => {
  return (str.charAt(0).toUpperCase() + str.slice(1)).replace(
    /-([a-z])/g,
    (match, letter) => {
      return letter.toUpperCase();
    },
  );
};

module.exports = {
  prompt: ({ prompter, args }) =>
    prompter
      .prompt({
        type: 'input',
        name: 'components',
        message:
          '공통 컴포넌트 이름을 PascalCase로 입력해 주세요. (ex. Button)',
      })
      .then(({ components }) => {
        if (!components) {
          throw new Error('컴포넌트 이름을 입력해 주세요.');
        }
        if (!RegExp(/^[a-zA-Z,-]*$/).test(components)) {
          throw new Error('영어로 입력해 주세요.');
        }

        return prompter
          .select({
            type: 'select',
            name: 'confirm',
            message: `<${toPascalCase(components)} /> 컴포넌트가 맞나요?`,
            choices: ['네', '아니요'],
          })
          .then((choices) => {
            if (choices === '아니요') {
              throw new Error(
                '컴포넌트 이름이 올바르지 않습니다. 다시 시도해 주세요.',
              );
            }

            return {
              components,
              args,
            };
          });
      }),
};
