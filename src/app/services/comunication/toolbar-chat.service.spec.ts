import { TestBed } from '@angular/core/testing';

import { ToolbarChatService } from './toolbar-chat.service';

describe('ToolbarChatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToolbarChatService = TestBed.get(ToolbarChatService);
    expect(service).toBeTruthy();
  });
});
