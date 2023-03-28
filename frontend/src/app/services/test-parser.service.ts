import { Injectable } from '@angular/core';
import { Test } from '../models/test';
import { MOCKED_TEST } from '../mocks/test-mock';

@Injectable({
  providedIn: 'root',
})
export class TestParserService {
  parseFile(file: string): Test {
    console.log(file);
    return MOCKED_TEST;
  }

  generateHeader(test: Test): string {
    const title = `# ${test.title}\n`;
    const author = `# ${test.author} - using eTester\n`;
    const description = `# ${test.description}\n`;
    const prerequisites = `# ${test.prerequisites}\n`;

    return title + author + description + prerequisites;
  }

  generateCode(test: Test): string {
    const header = this.generateHeader(test);

    return header;
  }
}
