import { describe, expect, it } from 'vitest';
import { parseCliArgs } from '../src/args';
import { CliError } from '../src/errors';

describe('parseCliArgs', () => {
  it('returns defaults with no arguments', () => {
    expect(parseCliArgs([])).toEqual({
      directory: undefined,
      template: undefined,
      pm: undefined,
      install: undefined,
      git: undefined,
      overwrite: false,
      yes: false,
      help: false,
      version: false,
    });
  });

  it('reads the directory positional and short flags', () => {
    const args = parseCliArgs(['my-app', '-t', 'vite', '-y']);
    expect(args.directory).toBe('my-app');
    expect(args.template).toBe('vite');
    expect(args.yes).toBe(true);
  });

  it('accepts long options', () => {
    const args = parseCliArgs(['--template', 'react-router', '--pm', 'pnpm', '--overwrite']);
    expect(args.template).toBe('react-router');
    expect(args.pm).toBe('pnpm');
    expect(args.overwrite).toBe(true);
  });

  it.each([
    [[], undefined],
    [['--install'], true],
    [['--no-install'], false],
    [['--install', '--no-install'], false],
  ])('resolves install tri-state for %j', (argv, expected) => {
    expect(parseCliArgs(argv).install).toBe(expected);
  });

  it.each([
    [[], undefined],
    [['--git'], true],
    [['--no-git'], false],
  ])('resolves git tri-state for %j', (argv, expected) => {
    expect(parseCliArgs(argv).git).toBe(expected);
  });

  it('parses -h and -v', () => {
    expect(parseCliArgs(['-h']).help).toBe(true);
    expect(parseCliArgs(['-v']).version).toBe(true);
  });

  it('ignores a forwarded "--" separator', () => {
    const args = parseCliArgs(['my-app', '--', '--template', 'vite']);
    expect(args.directory).toBe('my-app');
    expect(args.template).toBe('vite');
  });

  it('rejects unknown options', () => {
    expect(() => parseCliArgs(['--bogus'])).toThrow(CliError);
  });

  it('rejects more than one positional', () => {
    expect(() => parseCliArgs(['a', 'b'])).toThrow(/Unexpected argument: b/);
  });

  it('rejects unknown templates and package managers', () => {
    expect(() => parseCliArgs(['-t', 'remix'])).toThrow(/Unknown template "remix"/);
    expect(() => parseCliArgs(['--pm', 'deno'])).toThrow(/Unknown package manager "deno"/);
  });
});
