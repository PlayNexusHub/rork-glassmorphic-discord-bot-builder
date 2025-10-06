export type RiskLevel = 'low' | 'medium' | 'high';
export type Complexity = 'simple' | 'moderate' | 'advanced';

export interface Capability {
  id: string;
  title: string;
  description: string;
  tags: string[];
  riskLevel: RiskLevel;
  complexity: Complexity;
  files: {
    target: string;
    template: string;
  }[];
}

export interface BotConfig {
  name: string;
  description: string;
  prefix: string;
  selectedCapabilities: string[];
  theme: 'dark' | 'light' | 'cyberpunk';
  features: {
    slashCommands: boolean;
    prefixCommands: boolean;
    autoModeration: boolean;
    logging: boolean;
  };
}

export interface GeneratedBot {
  config: BotConfig;
  files: {
    path: string;
    content: string;
  }[];
  dependencies: string[];
  setupInstructions: string;
}
