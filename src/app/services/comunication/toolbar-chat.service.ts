// Se agregó EventEmitter
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolbarChatService {

  datosChat = new EventEmitter()

  constructor() { }
}