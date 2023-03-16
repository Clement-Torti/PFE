/* eslint-disable */
export class File {
    _id: string;
    title: string;
    _folderId: string;
    content: string;
  
    constructor(_id: string, title: string, _folderId: string, content: string) {
        this._id = _id;
        this.title = title;
        this._folderId = _folderId;
        this.content = content;
    }
  }
  