"use client";
import {
  TiptapLink,
  TaskList,
  TaskItem,
  HorizontalRule,
  StarterKit,
  Placeholder,
  Color,
  HighlightExtension,
  TextStyle,
  CodeBlockLowlight,
} from "novel/extensions";
import TextDirection from "tiptap-text-direction";
import TextAlign from "@tiptap/extension-text-align";
import HardBreak from "@tiptap/extension-hard-break";

import { createLowlight, common } from "lowlight";

import { cx } from "class-variance-authority";

import BaseHeading from "@tiptap/extension-heading";
import { mergeAttributes } from "@tiptap/core";

type Levels = 1 | 2 | 3;

const classes: Record<Levels, string> = {
  1: "text-4xl font-bold",
  2: "text-3xl font-bold",
  3: "text-2xl font-bold",
};

const Heading = BaseHeading.configure({ levels: [1, 2, 3] }).extend({
  renderHTML({ node, HTMLAttributes }) {
    const _level: Levels = node.attrs.level;
    const hasLevel = this.options.levels.includes(_level);
    const level: Levels = hasLevel ? node.attrs.level : this.options.levels[0];

    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: `${classes[level]}`,
      }),
      0,
    ];
  },
});

const textAlign = TextAlign.configure({
  types: ["heading", "paragraph"],
  alignments: ["center"],
}).extend({
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-E": () => {
        if (this.editor.isActive({ textAlign: "center" })) {
          return this.editor.commands.unsetTextAlign();
        }

        return this.editor.commands.setTextAlign("center");
      },
    };
  },
});

const textDirection = TextDirection.configure({
  types: ["heading", "paragraph", "blockquote"],
});

const placeholder = Placeholder.configure({
  placeholder: ({ node }) => {
    if (node.type.name === "heading") {
      return `Heading ${node.attrs.level}`;
    }
    return "استعمل / من اجل الاوامر الجاهزة";
  },
  includeChildren: true,
});

const tiptapLink = TiptapLink.configure({
  HTMLAttributes: {
    class: cx(
      "text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer",
    ),
  },
});

const taskList = TaskList.configure({
  HTMLAttributes: {
    class: cx("not-prose pl-2 "),
  },
});
const taskItem = TaskItem.configure({
  HTMLAttributes: {
    class: cx("flex gap-2 items-start my-4"),
  },
  nested: true,
});

const horizontalRule = HorizontalRule.configure({
  HTMLAttributes: {
    class: cx("mt-4 mb-6 border-t border-muted-foreground"),
  },
});
const heading = Heading;

const starterKit = StarterKit.configure({
  heading: false,
  bulletList: {
    HTMLAttributes: {
      class: cx("list-disc list-outside leading-3 -mt-2"),
    },
  },
  orderedList: {
    HTMLAttributes: {
      class: cx("list-decimal list-outside leading-3 -mt-2"),
    },
  },
  listItem: {
    HTMLAttributes: {
      class: cx("leading-normal -mb-2"),
    },
  },
  blockquote: {
    HTMLAttributes: {
      class: cx("border-purple-900"),
    },
  },
  codeBlock: false,
  code: {
    HTMLAttributes: {
      class: cx("rounded-md bg-muted  px-1.5 py-1 font-mono font-medium"),
      spellcheck: "false",
    },
  },
  horizontalRule: false,
  dropcursor: {
    color: "#DBEAFE",
    width: 4,
  },
  gapcursor: false,
});

const codeBlockLowlight = CodeBlockLowlight.configure({
  lowlight: createLowlight(common),
});

export const defaultExtensions = [
  starterKit,
  tiptapLink,
  HardBreak,
  taskList,
  taskItem,
  horizontalRule,
  heading,
  placeholder,
  textAlign,
  Color,
  HighlightExtension,
  TextStyle,
  textDirection,
  codeBlockLowlight,
];
