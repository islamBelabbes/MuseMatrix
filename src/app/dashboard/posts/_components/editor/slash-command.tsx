import {
  CheckSquare,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Text,
  TextQuote,
} from "lucide-react";
import { createSuggestionItems } from "novel";
import { Command, renderItems } from "novel";
// import { uploadFn } from "./image-upload";

export const suggestionItems = createSuggestionItems([
  {
    title: "نص",
    description: "ابدأ الكتابة بنص عادي.",
    searchTerms: ["p", "فقرة"],
    icon: <Text size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode("paragraph", "paragraph")
        .run();
    },
  },
  {
    title: "قائمة المهام",
    description: "تتبع المهام باستخدام قائمة المهام.",
    searchTerms: ["todo", "مهمة", "قائمة", "تحقق", "مربع اختيار"],
    icon: <CheckSquare size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run();
    },
  },
  {
    title: "عنوان 1",
    description: "عنوان قسم كبير.",
    searchTerms: ["title", "كبير", "ضخم"],
    icon: <Heading1 size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 1 })
        .run();
    },
  },
  {
    title: "عنوان 2",
    description: "عنوان قسم متوسط.",
    searchTerms: ["subtitle", "متوسط"],
    icon: <Heading2 size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run();
    },
  },
  {
    title: "عنوان 3",
    description: "عنوان قسم صغير.",
    searchTerms: ["subtitle", "صغير"],
    icon: <Heading3 size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 3 })
        .run();
    },
  },
  // {
  //   title: "قائمة نقطية",
  //   description: "إنشاء قائمة نقطية بسيطة.",
  //   searchTerms: ["غير مرتبة", "نقطة"],
  //   icon: <List size={18} />,
  //   command: ({ editor, range }) => {
  //     editor.chain().focus().deleteRange(range).toggleBulletList().run();
  //   },
  // },
  // {
  //   title: "قائمة مرقمة",
  //   description: "إنشاء قائمة مرقمة.",
  //   searchTerms: ["مرتبة"],
  //   icon: <ListOrdered size={18} />,
  //   command: ({ editor, range }) => {
  //     editor.chain().focus().deleteRange(range).toggleOrderedList().run();
  //   },
  // },
  {
    title: "اقتباس",
    description: "التقاط اقتباس.",
    searchTerms: ["blockquote"],
    icon: <TextQuote size={18} />,
    command: ({ editor, range }) =>
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode("paragraph", "paragraph")
        .toggleBlockquote()
        .setNode("blockquote", { style: "direction: rtl;" }) // Add this line to set RTL direction
        .run(),
  },
  {
    title: "كود",
    description: "التقاط كود.",
    searchTerms: ["codeblock"],
    icon: <Code size={18} />,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
  },
]);

export const slashCommand = Command.configure({
  suggestion: {
    items: () => suggestionItems,
    render: renderItems,
  },
});
