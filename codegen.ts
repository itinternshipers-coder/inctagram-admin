import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'https://gateway.traineegramm.ru/api/v1/graphql',
  documents: 'src/**/!(*.generated).graphql',
  generates: {
    'src/shared/graphql/__generated__/graphql.ts': {
      plugins: ['typescript'],
      config: {
        scalars: {
          DateTime: 'string',
        },
      },
    },
    'src/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: 'shared/graphql/__generated__/graphql.ts',
      },
      plugins: ['typescript-operations', 'typed-document-node'],
      config: {
        scalars: {
          DateTime: 'string',
        },
      },
    },
  },
}

export default config
