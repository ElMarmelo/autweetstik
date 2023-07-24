import React, {
  useState,
  useRef,
  useCallback,
  type FormEvent,
  useLayoutEffect,
} from "react";
import { Button } from "./ui/button";
import { RiQuillPenFill } from "react-icons/ri";
import { useSession } from "next-auth/react";
import { ProfileImage } from "./ProfileImage";
import { api } from "~/utils/api";

function updateTextAreaHeight(textArea?: HTMLTextAreaElement) {
  if (textArea == null) return;

  textArea.style.height = "0";
  textArea.style.height = `${textArea.scrollHeight}px`;
}

export default function NewTweet() {
  const session = useSession();
  if (session.status != "authenticated") return null;

  return <Form />;
}

function Form() {
  const session = useSession();
  const [inputValue, setInputValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>();
  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextAreaHeight(textArea);
    textAreaRef.current = textArea;
  }, []);

  useLayoutEffect(() => {
    updateTextAreaHeight(textAreaRef.current);
  }, [inputValue]);

  const createTweet = api.tweet.create.useMutation({
    onSuccess: (newTweet) => {
      setInputValue("");
    },
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    createTweet.mutate({ content: inputValue });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 px-4 py-2">
        <div className="flex gap-4">
          {/* Provide a fallback */}
          <ProfileImage src={session.data?.user.image} />
          <textarea
            maxLength={300}
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-grow resize-none overflow-hidden rounded-md border-2 border-au-dark-700 bg-au-dark-900 p-4 text-lg outline-none"
            placeholder="Me cago en figueres"
          />
        </div>
        <p className="ml-auto font-semibold text-au-gray-100">
          Carácteres restantes: {300 - inputValue.length}
        </p>
        <div className="flex justify-end p-5">
          <Button size={"lg"} icon={<RiQuillPenFill />}>
            Autistear
          </Button>
        </div>
      </form>
    </>
  );
}
