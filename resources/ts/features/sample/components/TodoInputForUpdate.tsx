import { useEffect, useState } from "react"

type Props = {
  updatedTitle: string
  updatedFilename: string
  title: string
  filename: string
  setUpdatedTitle: (title: string) => void
  setUpdatedFilename: (filename: string) => void
  handleOnClick:  (arg1: string, arg2: string) => void
}

export const TodoInputForUpdate = (props: Props) => {

  const [title, setTitle] = useState(props.title);
  const [filename, setFilename] = useState(props.filename);

  const handleOnChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    props.setUpdatedTitle(e.target.value);
  };

  const handleOnChangeFilename = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilename(e.target.value);
    props.setUpdatedFilename(e.target.value);
  };

  return (
    <div>
      <h1>TodoInputForUpdate</h1>
      <p>{props.filename}</p>
      <label htmlFor="title">タイトル</label>
      <input value={title} onChange={handleOnChangeTitle} type="text" id="title" name="title" />
      <label htmlFor="imageFileName">ファイル名</label>
      <input value={filename} onChange={handleOnChangeFilename} type="text" id="filename" name="filename" required />
    </div>
  )
}