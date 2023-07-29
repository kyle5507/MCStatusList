export interface Status {
  version: Version;
  favicon: string;
  enforcesSecureChat: boolean;
  description: Description;
  players: PlayerList;
  ping: number;
  online: boolean;
}

interface PlayerList {
  max: number;
  online: number;
  sample: Players[];
}

interface Players {
  id: string;
  name: string;
}

interface Description {
  extra: Extra[];
  text: string;
}

interface Extra {
  bold: boolean;
  text: string;
  italic?: boolean;
  underlined?: boolean;
  strikethrough?: boolean;
  obfuscated?: boolean;
  color?: string;
}

interface Version {
  name: string;
  protocol: number;
}
export interface StatusOptions {
  /** @default true */
  checkPing?: boolean;
  /** @default 5000 // ms */
  timeout?: number;
  /** @default 736 // 1.16.1 */
  protocol?: number;
}
export declare function getStatus(host: string, port?: number | null, options?: StatusOptions): Promise<Status>;
