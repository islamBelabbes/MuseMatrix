"use client";
import React, { useState } from "react";
import {
  EditorRoot,
  EditorCommand,
  EditorCommandItem,
  EditorCommandEmpty,
  EditorContent,
  type JSONContent,
  EditorCommandList,
  EditorBubble,
} from "novel";
import { ImageResizer, handleCommandNavigation } from "novel";
import { defaultExtensions } from "./extensions";
import { NodeSelector } from "./selectors/node-selector";
import { LinkSelector } from "./selectors/link-selector";
import { ColorSelector } from "./selectors/color-selector";

import { TextButtons } from "./selectors/text-buttons";
import { slashCommand, suggestionItems } from "./slash-command";
import { Separator } from "@/components/ui/separator";
import useIsMounted from "@/hooks/use-is-mounted";
import Spinner from "@/components/ui/spinner";

const extensions = [...defaultExtensions, slashCommand];

interface EditorProp {
  initialValue?: JSONContent;
  onChange: (value: JSONContent) => void;
  onUpdate?: (value: JSONContent) => void;
}
const Editor = ({ initialValue, onChange, onUpdate }: EditorProp) => {
  const isMounted = useIsMounted();
  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);

  if (!isMounted) return <Spinner className="mx-auto" />;
  return (
    <EditorRoot>
      <EditorContent
        immediatelyRender={false}
        className="muse-content rounded-xl border p-4"
        {...(initialValue && { initialContent: initialValue })}
        extensions={extensions}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          // handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
          // handleDrop: (view, event, _slice, moved) =>
          //   handleImageDrop(view, event, moved, uploadFn),
          attributes: {
            class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-hidden max-w-full`,
          },
        }}
        onUpdate={({ editor }) => {
          onChange(editor.getJSON());
          return onUpdate?.(editor.getJSON());
        }}
        slotAfter={<ImageResizer />}
      >
        <EditorCommand
          className="border-muted bg-background z-50 h-auto max-h-[330px]
            overflow-y-auto rounded-md border px-1 py-2 shadow-md
            transition-all"
        >
          <EditorCommandEmpty className="text-muted-foreground px-2">
            لايوجد نتيجة
          </EditorCommandEmpty>
          <EditorCommandList>
            {suggestionItems.map((item) => (
              <EditorCommandItem
                value={item.title}
                onCommand={(val) => item.command?.(val)}
                className={`hover:bg-accent aria-selected:bg-accent flex w-full
                items-center gap-1 space-x-2 rounded-md px-2 py-1 text-sm`}
                key={item.title}
              >
                <div
                  className="border-muted bg-background flex h-10 w-10
                    items-center justify-center rounded-md border"
                >
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-muted-foreground text-xs">
                    {item.description}
                  </p>
                </div>
              </EditorCommandItem>
            ))}
          </EditorCommandList>
        </EditorCommand>

        <EditorBubble
          tippyOptions={{
            placement: "bottom",
          }}
          className="border-muted bg-background flex w-fit max-w-[90vw]
            overflow-hidden rounded-md border shadow-xl"
        >
          <Separator orientation="vertical" />
          <NodeSelector open={openNode} onOpenChange={setOpenNode} />

          <Separator orientation="vertical" />
          <LinkSelector open={openLink} onOpenChange={setOpenLink} />

          <Separator orientation="vertical" />
          <TextButtons />

          <Separator orientation="vertical" />
          <ColorSelector open={openColor} onOpenChange={setOpenColor} />
        </EditorBubble>
      </EditorContent>
    </EditorRoot>
  );
};

export default Editor;
