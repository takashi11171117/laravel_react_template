"use client";
import { UseFormRegisterReturn } from 'react-hook-form'
import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper'
import tw, { css } from 'twin.macro'
import { useRef, useState } from 'react'


type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: 'text' | 'email' | 'password' | 'file'
  registration: Partial<UseFormRegisterReturn>
}


export const ImageInputField = (props: InputFieldProps) => {

  const { type = 'file', label, error,registration,} = props

  //const { type = 'file', label, error,registration,watch} = props

  /*
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<String|undefined>("選択したファイル名が表示されます");
  */

  /*
  const [fileName, setFileName] = useState<String|undefined>("選択したファイル名が表示されます");
  const getFileName = (event:React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event?.target?.files;
    const uploadedFileName = fileList?.item(0)?.name
    setFileName(uploadedFileName);
    console.log(uploadedFileName);
  }
  */

  /*
  const { ref, ...rest } = {...registration}

  if(ref === undefined){
    return;
  }
  */

  /*
  if(watch === undefined){
    return;
  }
  */


  /*
  if(filelist === undefined){
    return;
  }

  const files = Array.from(filelist);

  const filename = files[0].name
  */

  //const files = Array.from(watch);

  //console.log(files[0].name);

  //document.getElementById("showFileNamePara")?

  //document.getElementById("file_upload").bind

  return (
    <div>
      <FieldWrapper label={label} error={error}>
          {/*<input id="file_upload" type={type} css={inputM} ref={(e) => {ref(e); fileInput.current = e;}}  {...rest} />*/}
          <input id="file_upload" type={type} css={inputM} {...registration} />
          {/*
          <div css={flexWrapper} >
            <button type='button' css={button} onClick={(e) => {
                if (fileInput) {
                  fileInput?.current?.click();
                  if(fileInput.current?.files === null || fileInput.current?.files === undefined){
                    return
                  }
                  const files = Array.from(fileInput.current?.files);
                  console.log(files[0].name);
                  setFileName(files[0].name);
                }
              }} >ファイルを選択
            </button>
            <p id="showFileNamePara" css={inputFB}>{fileName}</p>
          </div>
            */}
      </FieldWrapper>      
    </div>
  )
}

/*
const flexWrapper = css`
  ${tw`appearance-none block`}
  width: calc(100% - 1.5rem);
  display: flex;
`
const button = css`
  ${tw`appearance-none block px-3 py-2 bg-purple-500 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
  width: calc(100% - 1.5rem);
`
*/

const inputM = css`
  ${tw`appearance-none text-sm text-gray-500
            file:mr-5 file:py-3 file:px-10
            file:rounded-full file:border-0
            file:text-sm file:font-semibold  file:text-white
            file:bg-blue-400
            //file:bg-gradient-to-r file:from-blue-600 file:to-amber-600
            hover:file:cursor-pointer hover:file:opacity-80`}
  width: calc(100% - 1.5rem);
  //display: none;
`
/*
const inputFB = css`
${tw`appearance-none block bg-green-400 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400`}
width: calc(100% - 1.5rem);
height: calc(5rem);
`
*/

