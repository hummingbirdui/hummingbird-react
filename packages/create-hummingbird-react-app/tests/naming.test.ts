import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  isValidPackageName,
  projectNameFromDir,
  toValidPackageName,
  validateDirectoryInput,
} from '../src/naming';

describe('isValidPackageName', () => {
  it.each(['my-app', 'app1', '@scope/app', 'a.b_c~d'])('accepts %s', (name) => {
    expect(isValidPackageName(name)).toBe(true);
  });

  it.each(['', 'My-App', 'my app', '.hidden', '_private', 'a'.repeat(215)])(
    'rejects %j',
    (name) => {
      expect(isValidPackageName(name)).toBe(false);
    }
  );
});

describe('toValidPackageName', () => {
  it.each([
    ['My App!', 'my-app'],
    ['  Spaced  Out  ', 'spaced-out'],
    ['.dotfile', 'dotfile'],
    ['__init', 'init'],
    ['a--b', 'a-b'],
    ['!!!', 'hummingbird-app'],
  ])('%j -> %j', (input, expected) => {
    expect(toValidPackageName(input)).toBe(expected);
  });
});

describe('projectNameFromDir', () => {
  it('uses the basename of the resolved directory', () => {
    expect(projectNameFromDir('apps/My Site', '/tmp')).toBe('my-site');
  });

  it('resolves "." to the current directory name', () => {
    expect(projectNameFromDir('.', path.join('/tmp', 'cool-project'))).toBe('cool-project');
  });
});

describe('validateDirectoryInput', () => {
  it('requires a value', () => {
    expect(validateDirectoryInput('  ')).toMatch(/enter a directory/);
  });

  it('rejects reserved characters', () => {
    expect(validateDirectoryInput('a?b')).toMatch(/invalid characters/);
  });

  it('accepts normal names', () => {
    expect(validateDirectoryInput('my-app')).toBeUndefined();
  });
});
