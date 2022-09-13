import type { Variable } from '../types';

// TODO: 暂时使用any 后续结合table类型
type ISchema = any;
type SchemaProps = any;
type SchemaProperties = any;
export interface CleanSchemaResult {
  key?: string;
  schema?: ISchema;
}

export function parseSchema(
  schema: ISchema,
  path: string = '',
  refPath?: string,
  parentFullName = '',
): Variable {
  const children: Variable[] = [];
  if (schema.type === 'object') {
    if (schema?.properties !== null) {
      const properties = schema.properties as SchemaProps;
      Object.keys(properties).forEach((key) => {
        const fieldSchema = properties[key];
        const fieldPath = `${path ? `${path}.` : ''}${key}`;
        const fullName = `${parentFullName || ''}${
          parentFullName ? '.' : ''
        }${schema.title ? schema.title : ''}`;
        if (refPath !== fieldPath) {
          children.push(parseSchema(fieldSchema, fieldPath, refPath, fullName));
        }
      });
    }
  } else if (schema.type === 'array') {
    const itemProperties = schema?.properties as
      | SchemaProperties
      | undefined;
    if (itemProperties) {
      const fullName = `${parentFullName || ''}${
        parentFullName ? '.' : ''
      }${schema.title ? schema.title : ''}`;
      children.push(
        ...Object.keys(itemProperties)
          .filter((key) =>
            `${path ? `${path}.` : ''}${key}` !== refPath)
          .map((key) => {
            const fieldSchema = itemProperties[key];
            const fieldPath = `${path ? `${path}.` : ''}${key}`;
            return parseSchema(fieldSchema, fieldPath, refPath, fullName);
          }),
      );
    }
  } else if (path !== refPath) {
    children.push({
      label: schema.title as string,
      value: path,
      type: schema.type || '',
      fullName: `${parentFullName || ''}${
        parentFullName ? '.' : ''
      }${schema.title}`,
    });
  }
  if (schema.type === 'object' || schema.type === 'array') {
    return {
      label: schema.title as string,
      value: path,
      type: schema.type?.toString(),
      children,
      fullName: `${parentFullName || ''}${
        parentFullName ? '.' : ''
      }${schema.title}`,
    };
  }
  return {
    label: schema.title as string,
    value: path,
    type: schema.type || '',
    fullName: `${parentFullName || ''}${
      parentFullName ? '.' : ''
    }${schema.title}`,
  };
}

function mapProperties(results: CleanSchemaResult[]) {
  const properties: Record<string, ISchema> = {};
  results.forEach((r) => {
    if (r.key && r.schema) {
      properties[r.key] = r.schema;
    }
  });
  return properties;
}

export function cleanVoidSchema(
  schema: ISchema,
  key?: string,
): CleanSchemaResult | CleanSchemaResult[] | undefined {
  if (schema?.type === 'object') {
    const { properties } = schema;
    if (typeof properties === 'object') {
      const cleanProperties: CleanSchemaResult[] = [];
      Object.keys(properties).forEach((propertyKey) => {
        const result = cleanVoidSchema(properties[propertyKey], propertyKey);
        if (Array.isArray(result)) {
          cleanProperties.push(...result);
        } else if (result) {
          cleanProperties.push(result);
        }
      });
      return {
        schema: { ...schema, properties: mapProperties(cleanProperties) },
        key,
      };
    }
    return { schema, key };
  }
  if (schema?.type === 'array') {
    const itemsSchema = schema?.items as ISchema | undefined;
    const itemsProperties = itemsSchema?.properties as SchemaProps | undefined;
    const cleanProperties: CleanSchemaResult[] = [];
    if (itemsProperties) {
      Object.keys(itemsProperties).forEach((propertyKey) => {
        const result = cleanVoidSchema(itemsProperties[propertyKey] as ISchema, propertyKey);
        if (Array.isArray(result)) {
          cleanProperties.push(...result);
        } else if (result) {
          cleanProperties.push(result);
        }
      });
    }
    const properties = itemsProperties
      ? mapProperties(cleanProperties)
      : undefined;
    const { items, ...other } = schema;
    return {
      schema: {
        ...other,
        properties,
      },
      key,
    };
  }
  if (schema?.type === 'void') {
    const properties = schema.properties as SchemaProps | undefined;
    const cleanProperties: CleanSchemaResult[] = [];
    if (properties) {
      Object.keys(properties).forEach((propertyKey) => {
        const result = cleanVoidSchema(properties[propertyKey] as ISchema, propertyKey);
        if (Array.isArray(result)) {
          cleanProperties.push(...result);
        } else if (result) {
          cleanProperties.push(result);
        }
      });
    }
    return cleanProperties;
  }
  return { schema, key };
}
