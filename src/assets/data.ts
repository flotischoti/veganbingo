import { messages } from "../assets/messages";

export interface fieldType {
  id: number;
  selected: boolean;
  selectable: boolean;
  meta?: string;
  title: string;
  text: string;
  img?: string;
}

export const allFields: fieldType[] = Array(
  Object.keys(messages.de.message.fields).length
)
  .fill(0)
  .map((v, i) => {
    return {
      id: i + 1,
      selected: false,
      text: `message.fields.field${i + 1}.statement`,
      selectable: true,
      title: `message.fields.field${i + 1}.quote`,
    };
  });
