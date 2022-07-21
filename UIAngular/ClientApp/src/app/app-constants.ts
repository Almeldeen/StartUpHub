import { QuillModules } from "ngx-quill";

export const usernameRegex = '^[A-Za-z][A-Za-z0-9_]{6,20}$' 

export const ROLES = {
    INTERN : 'INTERN',
    COMPANY : 'COMPANY',
    ADMIN : 'ADMIN',
}

export const quillModules: QuillModules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
    ],


    
}


export const JOBSTATES = {
    PENDING: 'PENDING',
    IN_PROGRESS: 'IN_PROGRESS',
    REJECTED: 'REJECTED',
    ACCEPTED: 'ACCEPTED'
};
export const dateFormat = 'd MMM , y, h:mm a';
export const dateFormatDate = 'd MMM , y';

export const blobToFile = (theBlob: Blob, fileName:string): File => {
    //Cast to a File() type
    return <File>theBlob;
}
export const fileToBlob = (file: File): Blob => {
    return new Blob([file]);
}