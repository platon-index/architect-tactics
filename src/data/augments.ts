export interface AugmentMaster {
  id: string;
  name: string;
  tier: 'SILVER' | 'GOLD' | 'PRISMATIC';
  category: '経済' | '防衛' | '火力' | '学習';
  description: string;
  iconName: string;
}

export const AUGMENT_POOL: AugmentMaster[] = [
  {
    id: 'aug_finops',
    name: 'FinOps・コミット契約',
    tier: 'GOLD',
    category: '経済',
    description: '最大利子の上限が 5G から 7G（所持金70Gまで）に拡張される。',
    iconName: 'Coins'
  },
  {
    id: 'aug_cert',
    name: 'オラクル認定プロフェッショナル',
    tier: 'PRISMATIC',
    category: '学習',
    description: 'クイズ正解時のボーナスゴールドが2倍になり、戦闘バフが +15% から +30% に倍増する。',
    iconName: 'Award'
  },
  {
    id: 'aug_dr',
    name: 'マルチリージョン完全DR',
    tier: 'PRISMATIC',
    category: '防衛',
    description: '味方ユニットが倒れた際、各ユニット1度だけ最大HPの40%で即座に自動復旧（フェイルオーバー）する。',
    iconName: 'ShieldAlert'
  },
  {
    id: 'aug_autoscale',
    name: 'オートスケーリング・ブースト',
    tier: 'GOLD',
    category: '火力',
    description: '戦闘開始後、毎秒味方全体の攻撃速度が +4% ずつ段階上昇する（最大+80%）。',
    iconName: 'TrendingUp'
  },
  {
    id: 'aug_zerotrust',
    name: 'ゼロトラスト・ガバナンス',
    tier: 'GOLD',
    category: '防衛',
    description: '前衛ユニットの防御力が +30% され、敵の攻撃力・スキル威力を常時 20% 低下させる。',
    iconName: 'Lock'
  },
  {
    id: 'aug_cloudnative',
    name: 'クラウドネイティブ統合',
    tier: 'GOLD',
    category: '火力',
    description: '全ユニットのスキル発動間隔（クールダウン）が 25% 短縮される。',
    iconName: 'Zap'
  },
  {
    id: 'aug_enterprise',
    name: 'エンタープライズ一括調達',
    tier: 'SILVER',
    category: '経済',
    description: '即座に +15G を獲得し、ショップの更新コストが 2G から 1G に半減する。',
    iconName: 'Building'
  },
  {
    id: 'aug_reserved',
    name: 'リザーブド・キャパシティ',
    tier: 'SILVER',
    category: '経済',
    description: '毎ラウンド開始時、コスト1〜2のOCIサービス（★1）がランダムに1体ベンチに無償配備される。',
    iconName: 'Server'
  }
];
