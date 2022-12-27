import React from "react";
import { Editor } from "react-draft-wysiwyg";
import DOMPurify from "dompurify";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextEditor = ({ editorState, onEditorStateChange, uploadCallback }) => {
    return (
        <div className="flex flex-col gap-10">
            <Editor
                wrapperClassName="flex flex-col items-center"
                editorClassName="prose lg:prose-xl bg-white lg:shadow w-full lg:w-8/12 p-0 lg:p-8 rounded mt-6 text-gray-700 lg:border"
                toolbarClassName="border border-black text-sm font-medium text-gray-700"
                placeholder="Now write something great..."
                toolbar={{
                    image: {
                        uploadCallback: uploadCallback,
                        previewImage: true,
                    },
                }}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
            />
        </div>
    );

    function createMarkup(html) {
        return {
            __html: DOMPurify.sanitize(html),
        };
    }
};

export default TextEditor;
