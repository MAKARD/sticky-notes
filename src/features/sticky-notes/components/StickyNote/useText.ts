import React from "react";

interface Params {
    initialText: string
    onCommitChanges: (text: string) => void
}

export const useText = ({ initialText, onCommitChanges }: Params) => {
    const [localText, setLocalText] = React.useState(initialText);

    const onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLocalText(event.target.value);
    };

    const onBlur = () => {
        onCommitChanges(localText);
    };

    return {
        onBlur,
        value: localText,
        onTextChange
    }
}
