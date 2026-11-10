import React, { useState, useEffect, useRef, useMemo } from 'react';
import { OCI_PRACTICE_QUIZZES } from './data/quizzes';
import {
  Shield,
  Server,
  Database,
  Network,
  Cpu,
  Lock,
  Zap,
  RefreshCw,
  ArrowUpCircle,
  Play,
  Award,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Info,
  HelpCircle,
  Trash2,
  FastForward,
  RotateCcw,
  Code,
  Sparkles,
  Layers,
  Activity,
  Coins,
  BookOpen,
  Smartphone,
  ChevronRight,
  ShieldAlert,
  TrendingUp,
  Building
} from 'lucide-react';
import { AUGMENT_POOL } from './data/augments';

// オーグメント(設計戦略)のアイコン対応表
const AUGMENT_ICONS = { Coins, Award, ShieldAlert, TrendingUp, Lock, Zap, Building, Server };
const AUGMENT_TIER_STYLE = {
  SILVER: 'border-slate-400/70 bg-slate-800/90 text-slate-200',
  GOLD: 'border-amber-400/80 bg-amber-950/50 text-amber-200',
  PRISMATIC: 'border-fuchsia-400/80 bg-fuchsia-950/50 text-fuchsia-200',
};
const AUGMENT_ROUNDS = [1, 4, 10, 15];
const MAX_AUGMENTS = 4;

// ==========================================
// 1. マスターデータ定義 (Data-Driven Architecture)
// ==========================================

// 4つの主要シナジー（絆）定義
const SYNERGY_MASTERS = {
  network: {
    id: 'network',
    name: 'ネットワーク基盤',
    iconName: 'Network',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/20',
    borderColor: 'border-cyan-500/50',
    description: '低遅延ルーティングにより、味方全体の攻撃速度（処理サイクル）が上昇します。',
    thresholds: [
      { count: 2, label: '2種: 攻撃速度 +25%', speedMult: 1.25 },
      { count: 4, label: '4種: 攻撃速度 +55%', speedMult: 1.55 },
    ],
  },
  compute_data: {
    id: 'compute_data',
    name: 'コンピュート＆データ',
    iconName: 'Cpu',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/20',
    borderColor: 'border-amber-500/50',
    description: '演算能力とIOPSの強化により、味方全体の処理火力（ATK）が上昇します。',
    thresholds: [
      { count: 2, label: '2種: 全体ATK +25%', atkMult: 1.25 },
      { count: 4, label: '4種: 全体ATK +60%', atkMult: 1.60 },
    ],
  },
  security: {
    id: 'security',
    name: 'ゼロトラスト防衛',
    iconName: 'Shield',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/20',
    borderColor: 'border-emerald-500/50',
    description: '最小権限と多層防御により被ダメージを軽減し、サイバー攻撃系ボスの特性を無効化します。',
    thresholds: [
      { count: 2, label: '2種: 被ダメ -20% / 攻撃反射', dmgReduction: 0.20, reflect: 0.15 },
      { count: 4, label: '4種: 被ダメ -45% / 強反射', dmgReduction: 0.45, reflect: 0.35 },
    ],
  },
  ha: {
    id: 'ha',
    name: '高可用性 (Multi-AD)',
    iconName: 'Layers',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-500/50',
    description: '冗長構成により戦闘開始時に耐久シールドを展開し、継続的にHPを自動修復します。',
    thresholds: [
      { count: 2, label: '2種: 開幕シールド25% + 自動修復', shieldRatio: 0.25, regenPerSec: 18 },
      { count: 4, label: '4種: 開幕シールド55% + 高速修復', shieldRatio: 0.55, regenPerSec: 45 },
    ],
  },
};

// OCI 主要15サービス（コスト1〜3）
const UNIT_MASTERS = [
  // --- コスト 1 (5種) ---
  {
    id: 'oci_vcn',
    domain: 'OCI',
    name: 'VCN (仮想クラウドNW)',
    shortName: 'VCN',
    cost: 1,
    position: 'FRONT',
    synergies: ['network', 'ha'],
    iconType: 'Network',
    stats: { hp: 650, atk: 35, speed: 0.9 },
    skill: {
      name: 'セキュリティリスト防壁',
      description: 'パブリック/プライベートの境界を防衛し、自身のシールドを220回復する。',
      type: 'SHIELD',
      power: 220,
      maxMana: 100,
    },
    ociNote: 'リージョン内の複数の可用性ドメイン(AD)にまたがる論理ネットワーク。',
  },
  {
    id: 'oci_compute',
    domain: 'OCI',
    name: 'Compute (VM Instance)',
    shortName: 'Compute VM',
    cost: 1,
    position: 'BACK',
    synergies: ['compute_data', 'ha'],
    iconType: 'Cpu',
    stats: { hp: 380, atk: 68, speed: 1.1 },
    skill: {
      name: 'フレキシブルシェイプ演算',
      description: 'OCPUとメモリを最適化し、敵にATKの220%の単体処理ダメージを与える。',
      type: 'DAMAGE',
      power: 2.2,
      maxMana: 80,
    },
    ociNote: '1つのAD内の特定のフォルトドメイン(FD)上に配置される仮想マシン。',
  },
  {
    id: 'oci_obj_storage',
    domain: 'OCI',
    name: 'Object Storage',
    shortName: 'Object Storage',
    cost: 1,
    position: 'BACK',
    synergies: ['compute_data', 'ha'],
    iconType: 'Database',
    stats: { hp: 460, atk: 42, speed: 0.85 },
    skill: {
      name: 'オートティアリング圧縮',
      description: 'コスト最適化を実行！【盤面配置で毎ラウンド終了時に+1Gの追加予算を獲得】',
      type: 'ECON_BUFF',
      power: 140,
      maxMana: 90,
    },
    ociNote: 'リージョン規模のサービスであり、特定のADに縛られず高耐久性を提供。',
  },
  {
    id: 'oci_iam',
    domain: 'OCI',
    name: 'OCI IAM',
    shortName: 'IAM',
    cost: 1,
    position: 'FRONT',
    synergies: ['security'],
    iconType: 'Lock',
    stats: { hp: 580, atk: 40, speed: 1.0 },
    skill: {
      name: 'コンパートメント隔離認可',
      description: '不正なリクエストを拒否し、前衛全体のシールドを160付与する。',
      type: 'TEAM_SHIELD',
      power: 160,
      maxMana: 90,
    },
    ociNote: 'リソースの論理的な分離とアクセス制御には「コンパートメント」と「ポリシー」を使用。',
  },
  {
    id: 'oci_bastion',
    domain: 'OCI',
    name: 'OCI Bastion',
    shortName: 'Bastion',
    cost: 1,
    position: 'FRONT',
    synergies: ['security', 'network'],
    iconType: 'Shield',
    stats: { hp: 540, atk: 48, speed: 1.15 },
    skill: {
      name: '時限SSHセッション制御',
      description: 'パブリックIPを持たないターゲットへの安全な接続を確立し、自身のHPを180回復＆追撃。',
      type: 'HEAL_ATTACK',
      power: 180,
      maxMana: 85,
    },
    ociNote: '踏み台サーバーを常時起動せず、時間制限付きの安全なSSHアクセスを提供するマネージドサービス。',
  },

  // --- コスト 2 (5種) ---
  {
    id: 'oci_flb',
    domain: 'OCI',
    name: 'Flexible Load Balancer',
    shortName: 'Flexible LB',
    cost: 2,
    position: 'FRONT',
    synergies: ['network', 'ha'],
    iconType: 'Activity',
    stats: { hp: 820, atk: 50, speed: 1.1 },
    skill: {
      name: 'ヘルスチェック＆負荷分散',
      description: 'トラフィックを健全なバックエンドに振り分け、味方全体に240シールドと速度バフを付与。',
      type: 'TEAM_SHIELD',
      power: 240,
      maxMana: 90,
    },
    ociNote: '最小10Mbps〜最大8,000Mbpsまで帯域幅を動的に設定できるL4/L7ロードバランサ。',
  },
  {
    id: 'oci_block_vol',
    domain: 'OCI',
    name: 'Block Volume',
    shortName: 'Block Volume',
    cost: 2,
    position: 'BACK',
    synergies: ['compute_data', 'ha'],
    iconType: 'Database',
    stats: { hp: 550, atk: 78, speed: 1.0 },
    skill: {
      name: 'Ultra High Performance IOPS',
      description: '動的パフォーマンス調整により、高IOPSの衝撃で敵にATKの240%ダメージ＋味方火力強化。',
      type: 'DAMAGE',
      power: 2.4,
      maxMana: 85,
    },
    ociNote: 'インスタンスを停止せずに、ボリュームのパフォーマンス層(VPU)を動的に変更可能。',
  },
  {
    id: 'oci_atp',
    domain: 'OCI',
    name: 'Autonomous TP (ATP)',
    shortName: 'Autonomous TP',
    cost: 2,
    position: 'BACK',
    synergies: ['compute_data', 'ha'],
    iconType: 'Zap',
    stats: { hp: 460, atk: 105, speed: 1.2 },
    skill: {
      name: '自動インデックス＆高速クエリ',
      description: '自己チューニング機能により、敵の弱点を突くATK260%の超高速トランザクション攻撃！',
      type: 'DAMAGE',
      power: 2.6,
      maxMana: 75,
    },
    ociNote: 'パッチ適用・バックアップ・チューニングを自動化するOracle自律型データベース。',
  },
  {
    id: 'oci_cloud_guard',
    domain: 'OCI',
    name: 'Cloud Guard',
    shortName: 'Cloud Guard',
    cost: 2,
    position: 'BACK',
    synergies: ['security'],
    iconType: 'Shield',
    stats: { hp: 480, atk: 82, speed: 1.15 },
    skill: {
      name: 'ディテクタ＆レスポンダ自動修復',
      description: '構成ミスや脅威を自動検知し、敵に大ダメージを与えつつ味方全体のシールドを補強。',
      type: 'HYBRID',
      power: 2.1,
      maxMana: 80,
    },
    ociNote: 'ディテクタ・レシピで設定ミスや不審なアクティビティを検知し、レスポンダで自動対処する。',
  },
  {
    id: 'oci_apigw',
    domain: 'OCI',
    name: 'API Gateway',
    shortName: 'API Gateway',
    cost: 2,
    position: 'FRONT',
    synergies: ['network', 'security'],
    iconType: 'Server',
    stats: { hp: 740, atk: 65, speed: 1.2 },
    skill: {
      name: 'レート制限＆JWT認証',
      description: '過剰なAPIコールをスロットリングし、自身に280シールドを張りつつ敵に反撃ダメージ。',
      type: 'SHIELD',
      power: 280,
      maxMana: 80,
    },
    ociNote: 'バックエンド(FunctionsやOKE等)の前段で認証・認可・レート制限を一元管理する。',
  },

  // --- コスト 3 (5種) ---
  {
    id: 'oci_waf',
    domain: 'OCI',
    name: 'OCI WAF',
    shortName: 'OCI WAF',
    cost: 3,
    position: 'FRONT',
    synergies: ['security', 'network'],
    iconType: 'Shield',
    stats: { hp: 1050, atk: 75, speed: 1.1 },
    skill: {
      name: 'L7エッジルール＆OWASP遮断',
      description: 'SQLiやXSS、DDoS攻撃をエッジで完全遮断！前衛に400シールドを展開し敵に強烈な反射攻撃。',
      type: 'TEAM_SHIELD',
      power: 400,
      maxMana: 85,
    },
    ociNote: 'OWASPトップ10の脆弱性対策やアクセス制御、ボット管理を提供するL7ファイアウォール。',
  },
  {
    id: 'oci_oke',
    domain: 'OCI',
    name: 'OKE (Kubernetes Engine)',
    shortName: 'OKE',
    cost: 3,
    position: 'BACK',
    synergies: ['compute_data', 'ha'],
    iconType: 'Layers',
    stats: { hp: 620, atk: 138, speed: 1.25 },
    skill: {
      name: 'Virtual Node オートスケール連撃',
      description: 'サーバーレスKubernetesポッドを一斉展開し、敵にATKの300%のマルチヒット猛攻撃！',
      type: 'DAMAGE',
      power: 3.0,
      maxMana: 75,
    },
    ociNote: 'ワーカーノードの管理すら不要にする「仮想ノード(Virtual Nodes)」モードも選択可能なマネージドK8s。',
  },
  {
    id: 'oci_vault',
    domain: 'OCI',
    name: 'OCI Vault',
    shortName: 'OCI Vault',
    cost: 3,
    position: 'BACK',
    synergies: ['security', 'ha'],
    iconType: 'Lock',
    stats: { hp: 680, atk: 90, speed: 1.1 },
    skill: {
      name: 'HSMマスター暗号化シールド',
      description: 'FIPS 140-2 レベル3のHSMで暗号化保護し、味方全体に450の強力な暗号化シールドを付与！',
      type: 'TEAM_SHIELD',
      power: 450,
      maxMana: 85,
    },
    ociNote: '暗号化キー(Master Encryption Keys)とシークレットを安全に一元管理するサービス。',
  },
  {
    id: 'oci_fastconnect',
    domain: 'OCI',
    name: 'FastConnect',
    shortName: 'FastConnect',
    cost: 3,
    position: 'FRONT',
    synergies: ['network', 'ha'],
    iconType: 'Zap',
    stats: { hp: 960, atk: 88, speed: 1.35 },
    skill: {
      name: '専用線BGPハイスピード転送',
      description: 'インターネットを経由しない最大100Gbps+の専用接続で、味方全体をシールド補強＆高速連撃！',
      type: 'HYBRID',
      power: 2.5,
      maxMana: 75,
    },
    ociNote: 'オンプレミスとOCI間を専用回線で結び、予測可能で安定した高帯域・低遅延通信を実現。',
  },
  {
    id: 'oci_functions',
    domain: 'OCI',
    name: 'OCI Functions',
    shortName: 'OCI Functions',
    cost: 3,
    position: 'BACK',
    synergies: ['compute_data', 'network'],
    iconType: 'Sparkles',
    stats: { hp: 560, atk: 150, speed: 1.35 },
    skill: {
      name: 'イベント駆動サーバーレスバースト',
      description: 'Fn Projectベースの関数が瞬時に起動し、敵にATKの320%の超火力バーストダメージ！',
      type: 'DAMAGE',
      power: 3.2,
      maxMana: 70,
    },
    ociNote: 'オープンソースのFn Projectをベースとした完全マネージドでイベント駆動型のFaaS。',
  },
];

// 各ラウンドの敵（インシデント・サイバー攻撃ボス）: 演出テンプレート
const ENEMY_TEMPLATES = [
  {
    round: 1,
    name: '突発的トラフィックスパイク',
    subtitle: 'Level 1: キャンペーン開始による急激なアクセス集中',
    hp: 2000,
    atk: 65,
    speed: 0.9,
    weaknessText: '対策ヒント: 前衛にVCNやFlexible LBを配置し、後衛にComputeを置こう',
    counterSynergy: 'network',
    specialTrait: '前衛がいない場合、後衛のサーバーが直接過負荷を受けダメージ1.5倍',
  },
  {
    round: 2,
    name: 'クレデンシャル漏洩＆不正侵入試行',
    subtitle: 'Level 2: 過剰な権限を狙ったブルートフォース攻撃',
    hp: 3600,
    atk: 98,
    speed: 1.05,
    weaknessText: '対策ヒント: 「ゼロトラスト防衛」シナジー(IAM / Bastion / Cloud Guard)で被ダメ大幅軽減',
    counterSynergy: 'security',
    specialTrait: 'セキュリティ絆が未発動の場合、敵の攻撃力が+25%上昇',
  },
  {
    round: 3,
    name: '単一障害点 (SPOF) ハードウェア障害',
    subtitle: 'Level 3: 単一フォルトドメインの物理ラック障害発生',
    hp: 5800,
    atk: 135,
    speed: 1.1,
    weaknessText: '対策ヒント: 「高可用性 (Multi-AD)」シナジーと★2冗長化ユニットで耐え抜こう',
    counterSynergy: 'ha',
    specialTrait: '開幕に全体衝撃波を放つため、高可用性シールドが有効',
  },
  {
    round: 4,
    name: '大規模DDoS ＆ SQLインジェクション攻撃',
    subtitle: 'Level 4: ボットネットからのL7複合サイバー攻撃',
    hp: 8800,
    atk: 175,
    speed: 1.2,
    weaknessText: '対策ヒント: 前衛に「OCI WAF」または「API Gateway」を配置すると敵の火力を大幅弱体化！',
    counterUnitId: 'oci_waf',
    counterSynergy: 'security',
    specialTrait: 'OCI WAFが盤面にいる場合、敵の攻撃を遮断して受けるダメージを30%カット',
  },
  {
    round: 5,
    name: '【ステージボス】複合ランサムウェア＆リージョン高負荷',
    subtitle: 'Stage Boss: 暗号化脅迫と超大量トランザクションの同時発生',
    hp: 13500,
    atk: 230,
    speed: 1.25,
    weaknessText: '対策ヒント: Vault/WAFによる保護と、OKE/Functions/ATPの高火力処理を組み合わせよう！',
    counterUnitId: 'oci_vault',
    counterSynergy: 'compute_data',
    specialTrait: '5秒ごとに強力な全体スパイク攻撃を実行。複数シナジーと★2以上の編成が必須！',
  },
];


// 18ラウンド分のHP/ATKアンカー (round, hp, atk) 間を線形補間
const ENEMY_ANCHORS = [
  [1, 1500, 40],
  [6, 12000, 120],
  [12, 45000, 320],
  [17, 90000, 600],
  [18, 150000, 900],
];
const interpStat = (r: number, idx: 1 | 2) => {
  for (let i = 0; i < ENEMY_ANCHORS.length - 1; i++) {
    const a = ENEMY_ANCHORS[i];
    const b = ENEMY_ANCHORS[i + 1];
    if (r >= a[0] && r <= b[0]) {
      return Math.round(a[idx] + ((b[idx] - a[idx]) * (r - a[0])) / (b[0] - a[0]));
    }
  }
  return ENEMY_ANCHORS[ENEMY_ANCHORS.length - 1][idx];
};
const TOTAL_ROUNDS = 18;
const STAGE_ROUNDS = 6;
const BOSS_ROUNDS = [6, 12, 18];
const ENEMY_WAVES = Array.from({ length: TOTAL_ROUNDS }, (_, i) => {
  const r = i + 1;
  const tpl = ENEMY_TEMPLATES[(r - 1) % 4];
  const base = {
    ...tpl,
    round: r,
    hp: interpStat(r, 1),
    atk: interpStat(r, 2),
    speed: +(0.9 + (r - 1) * 0.025).toFixed(2),
  };
  if (r === 6) {
    return { ...ENEMY_TEMPLATES[4], ...base, name: '【第1面ボス】複合ランサムウェア＆リージョン高負荷', subtitle: 'Stage 1 Boss: 暗号化脅迫と超大量トランザクションの同時発生' };
  }
  if (r === 12) {
    return { ...ENEMY_TEMPLATES[4], ...base, name: '【第2面ボス】サプライチェーン侵害＆マルチAD同時障害', subtitle: 'Stage 2 Boss: 大規模な横展開攻撃とAD単位の障害が同時発生', counterSynergy: 'ha' };
  }
  if (r === 18) {
    return { ...ENEMY_TEMPLATES[4], ...base, name: '【破滅的障害】グローバルリージョン全損クライシス', subtitle: 'FINAL BOSS: リージョン全体を飲み込む破滅的な複合障害', speed: 1.35, specialTrait: '5秒ごとに強力な全体スパイク攻撃。★2〜★3編成と4つの設計戦略で削り切れ！' };
  }
  const stage = Math.ceil(r / STAGE_ROUNDS);
  return { ...base, subtitle: `Stage ${stage} - Round ${r}: ${tpl.subtitle.replace(/^Level \d+: /, '')}` };
});

// プレイヤーレベル(稼働枠)ごとの次レベル必要EXP (Lv3→4: 4 ... Lv9→10: 40)
const EXP_TO_NEXT_LEVEL: Record<number, number> = { 1: 2, 2: 3, 3: 4, 4: 8, 5: 12, 6: 16, 7: 24, 8: 32, 9: 40 };
const MAX_LEVEL = 10;

// クイズのカテゴリ名 (relatedUnitId 優先、なければIDプレフィックス)
const QUIZ_CATEGORY_BY_UNIT = {
  oci_vcn: 'ネットワーク基盤 / VCN',
  oci_fastconnect: 'ネットワーク / FastConnect',
  oci_lb: 'ネットワーク / ロードバランサ',
  oci_compute: 'コンピュート / インスタンス',
  oci_oke: 'コンピュート / OKE',
  oci_functions: 'コンピュート / Functions',
  oci_object_storage: 'ストレージ / Object Storage',
  oci_block_volume: 'ストレージ / Block Volume',
  oci_atp: 'データベース / Autonomous DB',
  oci_iam: 'セキュリティ / IAM',
  oci_vault: 'セキュリティ / Vault',
  oci_cloud_guard: 'セキュリティ / Cloud Guard',
  oci_waf: 'セキュリティ / WAF',
  oci_bastion: 'セキュリティ / Bastion',
};
const QUIZ_CATEGORY_BY_PREFIX = {
  q_net: 'ネットワーク',
  q_cmp: 'コンピュート',
  q_str: 'ストレージ',
  q_db: 'データベース',
  q_sec: 'セキュリティ',
  q_obs: '運用監視 / オブザーバビリティ',
  q_dev: 'DevOps / IaC・自動化',
  q_ent: 'ガバナンス / エンタープライズ',
  q_dr: '災害復旧 / レプリケーション',
  q_oke: 'コンテナ基盤 / OKE',
  q_fn: 'サーバーレス / Functions',
};
// relatedUnitId より接頭辞の分類を優先するプレフィックス
const QUIZ_PREFIX_OVERRIDES = ['q_obs', 'q_dev', 'q_ent', 'q_dr', 'q_oke', 'q_fn'];
const getQuizCategory = (quiz) => {
  const overridePrefix = QUIZ_PREFIX_OVERRIDES.find((p) => quiz.id.startsWith(p));
  if (overridePrefix) return QUIZ_CATEGORY_BY_PREFIX[overridePrefix];
  if (QUIZ_CATEGORY_BY_UNIT[quiz.relatedUnitId]) return QUIZ_CATEGORY_BY_UNIT[quiz.relatedUnitId];
  const prefix = Object.keys(QUIZ_CATEGORY_BY_PREFIX).find((p) => quiz.id.startsWith(p));
  return prefix ? QUIZ_CATEGORY_BY_PREFIX[prefix] : quiz.domain;
};
const getQuizDifficulty = (level) => {
  if (level >= 3) return { stars: '★★★', label: '上級', style: 'bg-rose-500/20 text-rose-300 border-rose-500/40' };
  if (level === 2) return { stars: '★★☆', label: '中級', style: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
  return { stars: '★☆☆', label: '初級', style: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
};

// ラウンド表記 (STAGE 1: R1-6 / STAGE 2: R7-12 / STAGE 3: R13-18)
const roundLabel = (r) => `STAGE ${Math.min(3, Math.ceil(r / STAGE_ROUNDS))} - ROUND ${r}`;

// プレイヤーレベルごとのショップ排出確率 (%) [Cost1, Cost2, Cost3]
const SHOP_ODDS_BY_LEVEL = {
  1: [100, 0, 0],
  2: [75, 25, 0],
  3: [55, 35, 10],
  4: [40, 40, 20],
  5: [25, 45, 30],
  6: [18, 42, 40],
  7: [12, 38, 50],
};

// ==========================================
// 2. ヘルパー関数・アイコン描画
// ==========================================

function renderServiceIcon(iconType, className = 'w-5 h-5') {
  switch (iconType) {
    case 'Network':
      return <Network className={className} />;
    case 'Cpu':
      return <Cpu className={className} />;
    case 'Database':
      return <Database className={className} />;
    case 'Lock':
      return <Lock className={className} />;
    case 'Shield':
      return <Shield className={className} />;
    case 'Activity':
      return <Activity className={className} />;
    case 'Zap':
      return <Zap className={className} />;
    case 'Server':
      return <Server className={className} />;
    case 'Layers':
      return <Layers className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    default:
      return <Server className={className} />;
  }
}

function getCostBadgeStyle(cost) {
  switch (cost) {
    case 1:
      return 'bg-slate-700 text-slate-200 border-slate-500';
    case 2:
      return 'bg-emerald-900/80 text-emerald-200 border-emerald-500';
    case 3:
      return 'bg-blue-900/80 text-cyan-200 border-cyan-400 shadow-sm shadow-cyan-500/30';
    default:
      return 'bg-purple-900/80 text-purple-200 border-purple-400';
  }
}

function getCardBorderByCost(cost) {
  switch (cost) {
    case 1:
      return 'border-slate-600/80 hover:border-slate-400';
    case 2:
      return 'border-emerald-500/70 hover:border-emerald-400';
    case 3:
      return 'border-cyan-400/80 hover:border-cyan-300 shadow-md shadow-cyan-950/50';
    default:
      return 'border-slate-600';
  }
}

// ★ランクに応じたステータス倍率（1: 単一構成, 2: Multi-AD冗長化, 3: Cross-Region冗長化）
function getStarMultiplier(star) {
  if (star === 2) return 1.8;
  if (star === 3) return 3.2;
  return 1.0;
}

function getStarLabel(star) {
  if (star === 1) return '★1 単一FD';
  if (star === 2) return '★★ Multi-AD';
  if (star === 3) return '★★★ Cross-Region';
  return '★1';
}

// ショップ抽選関数
function generateShopCards(level) {
  const odds = SHOP_ODDS_BY_LEVEL[Math.min(level, 7)] || [30, 40, 30];
  const cards = [];
  for (let i = 0; i < 5; i++) {
    const roll = Math.random() * 100;
    let targetCost = 1;
    if (roll < odds[0]) {
      targetCost = 1;
    } else if (roll < odds[0] + odds[1]) {
      targetCost = 2;
    } else {
      targetCost = 3;
    }
    const pool = UNIT_MASTERS.filter((u) => u.cost === targetCost);
    const picked = pool[Math.floor(Math.random() * pool.length)];
    cards.push(picked ? picked.id : UNIT_MASTERS[0].id);
  }
  return cards;
}

// ==========================================
// 3. メインコンポーネント (App)
// ==========================================

export default function App() {
  // --- ゲーム進行ステート ---
  const [phase, setPhase] = useState('PREP'); // 'PREP' | 'QUIZ' | 'BATTLE' | 'RESULT' | 'GAMEOVER' | 'VICTORY'
  const [round, setRound] = useState(1);
  const [slaHp, setSlaHp] = useState(100);
  const [gold, setGold] = useState(12); // 初期予算 12G
  const [level, setLevel] = useState(3); // 初期配置上限 3枠
  const [exp, setExp] = useState(0);

  // 盤面：前衛4枠・後衛6枠・ベンチ8枠
  const [frontRow, setFrontRow] = useState([
    {
      instanceId: 'init_vcn_1',
      masterId: 'oci_vcn',
      star: 1,
    },
    null,
    null,
    null,
  ]);
  const [backRow, setBackRow] = useState([
    {
      instanceId: 'init_comp_1',
      masterId: 'oci_compute',
      star: 1,
    },
    null,
    null,
    null,
    null,
    null,
  ]);
  const [bench, setBench] = useState(Array(8).fill(null));
  const [shop, setShop] = useState(() => generateShopCards(3));
  const [shopLocked, setShopLocked] = useState(false);

  // タップ選択ステート: { area: 'FRONT' | 'BACK' | 'BENCH', index: number } | null
  const [selectedSlot, setSelectedSlot] = useState(null);

  // 通知バナー（★合成達成など）
  const [toastMessage, setToastMessage] = useState(null);

  // クイズ用ステート
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizBonusActive, setQuizBonusActive] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [usedQuizIds, setUsedQuizIds] = useState<string[]>([]); // 出題済みクイズID履歴
  const [quizCorrectCount, setQuizCorrectCount] = useState(0);
  const [quizTotalCount, setQuizTotalCount] = useState(0);

  // 設計戦略（オーグメント）ステート
  const [activeAugments, setActiveAugments] = useState<string[]>([]);
  const [augmentChoices, setAugmentChoices] = useState<typeof AUGMENT_POOL | null>(() =>
    [...AUGMENT_POOL].sort(() => Math.random() - 0.5).slice(0, 3)
  ); // Round 1 開始時の第1回選択
  const [augmentInfoId, setAugmentInfoId] = useState<string | null>(null);
  const hasAug = (id: string) => activeAugments.includes(id);

  // オートバトル用ステート
  const [battleSpeed, setBattleSpeed] = useState(1); // 1x or 2x
  const [battleState, setBattleState] = useState(null);
  const [battleLogs, setBattleLogs] = useState([]);
  const [roundResult, setRoundResult] = useState(null);

  // 開発者・デプロイガイドモーダル
  const [activeModal, setActiveModal] = useState(null); // 'GUIDE' | 'JSON' | 'CATALOG' | null

  // トースト自動消去
  const showToast = (msg, type = 'info') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => {
      setToastMessage((prev) => (prev?.text === msg ? null : prev));
    }, 3200);
  };

  // --- 現在の盤面ユニット一覧とシナジー計算 ---
  const deployedUnits = useMemo(() => {
    const list = [];
    frontRow.forEach((u, idx) => {
      if (u) list.push({ ...u, row: 'FRONT', slotIndex: idx, master: UNIT_MASTERS.find((m) => m.id === u.masterId) });
    });
    backRow.forEach((u, idx) => {
      if (u) list.push({ ...u, row: 'BACK', slotIndex: idx, master: UNIT_MASTERS.find((m) => m.id === u.masterId) });
    });
    return list;
  }, [frontRow, backRow]);

  // 発動中シナジーの集計（ユニークなmasterIdごとにカウント）
  const activeSynergies = useMemo(() => {
    const uniqueMasters = new Map();
    deployedUnits.forEach((u) => {
      if (u.master) uniqueMasters.set(u.master.id, u.master);
    });

    const counts = {
      network: 0,
      compute_data: 0,
      security: 0,
      ha: 0,
    };

    uniqueMasters.forEach((master) => {
      master.synergies.forEach((synId) => {
        if (counts[synId] !== undefined) counts[synId] += 1;
      });
    });

    const details = Object.keys(SYNERGY_MASTERS).map((synId) => {
      const master = SYNERGY_MASTERS[synId];
      const count = counts[synId] || 0;
      let activeTier = null;
      master.thresholds.forEach((t) => {
        if (count >= t.count) activeTier = t;
      });
      return {
        ...master,
        count,
        activeTier,
      };
    });

    return details;
  }, [deployedUnits]);

  // 所持中の全ユニットカウント（ショップの「あと1体で★2合成！」表示用）
  const unitOwnershipCounts = useMemo(() => {
    const map = {};
    const allSlots = [...frontRow, ...backRow, ...bench];
    allSlots.forEach((u) => {
      if (u) {
        if (!map[u.masterId]) map[u.masterId] = { star1: 0, star2: 0, star3: 0 };
        if (u.star === 1) map[u.masterId].star1 += 1;
        if (u.star === 2) map[u.masterId].star2 += 1;
        if (u.star === 3) map[u.masterId].star3 += 1;
      }
    });
    return map;
  }, [frontRow, backRow, bench]);

  // 現在のラウンドの敵データ取得（ラウンド6以降は無限高負荷スケーリング）
  const currentEnemy = useMemo(() => {
    return ENEMY_WAVES[Math.min(round, TOTAL_ROUNDS) - 1];
  }, [round]);

  // 現在の利子計算（10Gごとに+1G、最大50Gで+5G）
  const calcInterest = (g: number) => Math.min(hasAug('aug_finops') ? 7 : 5, Math.floor(g / 10));
  const currentInterest = calcInterest(gold);
  const refreshCost = hasAug('aug_enterprise') ? 1 : 2;
  const quizGoldMult = hasAug('aug_cert') ? 2 : 1;
  const quizBuffRate = hasAug('aug_cert') ? 0.3 : 0.15;

  // レベルアップに必要な残りEXP
  const expNeededForNextLevel = EXP_TO_NEXT_LEVEL[level] ?? 40;

  // EXP加算（複数レベル同時アップ対応）
  const applyExpGain = (gain: number) => {
    let lv = level;
    let ex = exp + gain;
    while (lv < MAX_LEVEL && ex >= (EXP_TO_NEXT_LEVEL[lv] ?? 40)) {
      ex -= EXP_TO_NEXT_LEVEL[lv] ?? 40;
      lv += 1;
    }
    if (lv >= MAX_LEVEL) ex = 0;
    setLevel(lv);
    setExp(ex);
    return lv;
  };

  // ==========================================
  // 4. ★ランク自動合成 (3体集まると★2 / ★3へ自動進化)
  // ==========================================

  const tryAutoMergeUnits = (nextFront, nextBack, nextBench) => {
    let f = [...nextFront];
    let b = [...nextBack];
    let ben = [...nextBench];
    let mergedAny = false;
    let mergeLogText = '';

    // ★1 -> ★2、続いて ★2 -> ★3 をチェック
    for (let targetStar = 1; targetStar <= 2; targetStar++) {
      const positionsByMaster = {};

      const scanArray = (arr, areaName) => {
        arr.forEach((u, idx) => {
          if (u && u.star === targetStar) {
            if (!positionsByMaster[u.masterId]) positionsByMaster[u.masterId] = [];
            positionsByMaster[u.masterId].push({ area: areaName, idx, unit: u });
          }
        });
      };

      // 優先順位: FRONT -> BACK -> BENCH の順にスキャン（合成後の個体は盤面側を優先して残す）
      scanArray(f, 'FRONT');
      scanArray(b, 'BACK');
      scanArray(ben, 'BENCH');

      Object.keys(positionsByMaster).forEach((masterId) => {
        const matches = positionsByMaster[masterId];
        if (matches.length >= 3) {
          const toMerge = matches.slice(0, 3);
          const keepSlot = toMerge[0];
          const removeSlots = toMerge.slice(1);

          const upgradedUnit = {
            instanceId: `merged_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
            masterId,
            star: targetStar + 1,
          };

          const setSlotValue = (area, idx, val) => {
            if (area === 'FRONT') f[idx] = val;
            if (area === 'BACK') b[idx] = val;
            if (area === 'BENCH') ben[idx] = val;
          };

          setSlotValue(keepSlot.area, keepSlot.idx, upgradedUnit);
          removeSlots.forEach((rm) => setSlotValue(rm.area, rm.idx, null));

          const masterObj = UNIT_MASTERS.find((m) => m.id === masterId);
          const starText = targetStar + 1 === 2 ? '★2 Multi-AD冗長構成' : '★3 Cross-Region完全冗長化';
          mergeLogText = `【スケールアップ合成！】${masterObj?.name} が ${starText} に進化しました！`;
          mergedAny = true;
        }
      });
    }

    return { f, b, ben, mergedAny, mergeLogText };
  };

  // ==========================================
  // 5. ショップ・盤面操作アクション
  // ==========================================

  // ショップからユニットを購入
  const handleBuyUnit = (shopIndex) => {
    if (phase !== 'PREP') return;
    const masterId = shop[shopIndex];
    if (!masterId) return;
    const master = UNIT_MASTERS.find((m) => m.id === masterId);
    if (!master) return;

    if (gold < master.cost) {
      showToast('クレジット（予算）が不足しています！', 'error');
      return;
    }

    // ベンチに空きがあるか、または購入で即3体合成が起きるかチェック
    const emptyBenchIdx = bench.findIndex((slot) => slot === null);
    const ownedStar1Count = unitOwnershipCounts[masterId]?.star1 || 0;

    if (emptyBenchIdx === -1 && ownedStar1Count < 2) {
      showToast('待機ベンチが満杯です！ユニットを配置するか不要なサービスを売却してください。', 'error');
      return;
    }

    const newUnit = {
      instanceId: `unit_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      masterId: master.id,
      star: 1,
    };

    const nextBench = [...bench];
    if (emptyBenchIdx !== -1) {
      nextBench[emptyBenchIdx] = newUnit;
    } else {
      // ベンチが満杯でも所持2体なら即合成用に一時追加してマージ処理へ渡す
      nextBench.push(newUnit);
    }

    const { f, b, ben, mergedAny, mergeLogText } = tryAutoMergeUnits(frontRow, backRow, nextBench);

    setFrontRow(f);
    setBackRow(b);
    setBench(ben.slice(0, 8));
    setGold((prev) => prev - master.cost);

    const nextShop = [...shop];
    nextShop[shopIndex] = null;
    setShop(nextShop);

    if (mergedAny) {
      showToast(mergeLogText, 'success');
    }
  };

  // ショップ更新 (-2G)
  const handleRefreshShop = () => {
    if (phase !== 'PREP') return;
    if (gold < refreshCost) {
      showToast(`ショップ更新には ${refreshCost}G 必要です`, 'error');
      return;
    }
    setGold((prev) => prev - refreshCost);
    setShop(generateShopCards(level));
  };

  // システム拡張（EXP購入: -4G で +4 EXP）
  const handleBuyExp = () => {
    if (phase !== 'PREP') return;
    if (level >= 10) {
      showToast('システム最大枠（Lv.10）に到達しています', 'info');
      return;
    }
    if (gold < 4) {
      showToast('キャパシティ拡張には 4G 必要です', 'error');
      return;
    }

    setGold((prev) => prev - 4);
    const newLv = applyExpGain(4);
    if (newLv > level) {
      showToast(`システムLv.${newLv}に拡張！最大 ${newLv} 個のOCIサービスを同時稼働できます！`, 'success');
    }
  };

  // タップ操作によるユニットの選択・移動・入れ替え（iPad & Pixel Fold最適化）
  const handleSlotTap = (area, index) => {
    if (phase !== 'PREP') return;

    const getSlotUnit = (a, idx) => {
      if (a === 'FRONT') return frontRow[idx];
      if (a === 'BACK') return backRow[idx];
      return bench[idx];
    };

    const tappedUnit = getSlotUnit(area, index);

    // 1. まだ何も選択していない場合 -> ユニットがいれば選択状態にする
    if (!selectedSlot) {
      if (tappedUnit) {
        setSelectedSlot({ area, index });
      }
      return;
    }

    // 2. 同じマスを再度タップした場合 -> 選択解除
    if (selectedSlot.area === area && selectedSlot.index === index) {
      setSelectedSlot(null);
      return;
    }

    const sourceUnit = getSlotUnit(selectedSlot.area, selectedSlot.index);
    if (!sourceUnit) {
      setSelectedSlot(null);
      return;
    }

    // 3. ベンチから盤面（FRONT/BACK）の空きマスへ出す場合、同時配置上限（level）をチェック
    const isSourceOnBoard = selectedSlot.area === 'FRONT' || selectedSlot.area === 'BACK';
    const isTargetOnBoard = area === 'FRONT' || area === 'BACK';

    if (!isSourceOnBoard && isTargetOnBoard && !tappedUnit) {
      if (deployedUnits.length >= level) {
        showToast(
          `現在の配置上限は ${level} 枠です！「枠拡張(-4G)」でレベルを上げるか、既存ユニットと入れ替えてください。`,
          'error'
        );
        return;
      }
    }

    // 4. スロットの入れ替え（または移動）を実行
    const nextFront = [...frontRow];
    const nextBack = [...backRow];
    const nextBench = [...bench];

    const writeSlot = (a, idx, val) => {
      if (a === 'FRONT') nextFront[idx] = val;
      if (a === 'BACK') nextBack[idx] = val;
      if (a === 'BENCH') nextBench[idx] = val;
    };

    writeSlot(selectedSlot.area, selectedSlot.index, tappedUnit || null);
    writeSlot(area, index, sourceUnit);

    setFrontRow(nextFront);
    setBackRow(nextBack);
    setBench(nextBench);
    setSelectedSlot(null);
  };

  // 選択中のユニットを売却（リソース解放）
  const handleSellSelectedUnit = () => {
    if (!selectedSlot || phase !== 'PREP') return;
    const { area, index } = selectedSlot;
    let unit = null;
    if (area === 'FRONT') unit = frontRow[index];
    if (area === 'BACK') unit = backRow[index];
    if (area === 'BENCH') unit = bench[index];
    if (!unit) return;

    const master = UNIT_MASTERS.find((m) => m.id === unit.masterId);
    const refund = master ? master.cost * (unit.star === 1 ? 1 : unit.star === 2 ? 3 : 6) : 1;

    if (area === 'FRONT') {
      const next = [...frontRow];
      next[index] = null;
      setFrontRow(next);
    } else if (area === 'BACK') {
      const next = [...backRow];
      next[index] = null;
      setBackRow(next);
    } else {
      const next = [...bench];
      next[index] = null;
      setBench(next);
    }

    setGold((prev) => prev + refund);
    setSelectedSlot(null);
    showToast(`${master?.shortName} をリソース解放し、+${refund}G を回収しました`, 'info');
  };

  // 現在選択されているユニットの詳細取得
  const selectedUnitDetail = useMemo(() => {
    if (!selectedSlot) return null;
    let u = null;
    if (selectedSlot.area === 'FRONT') u = frontRow[selectedSlot.index];
    if (selectedSlot.area === 'BACK') u = backRow[selectedSlot.index];
    if (selectedSlot.area === 'BENCH') u = bench[selectedSlot.index];
    if (!u) return null;
    const master = UNIT_MASTERS.find((m) => m.id === u.masterId);
    const mult = getStarMultiplier(u.star);
    return {
      ...u,
      area: selectedSlot.area,
      index: selectedSlot.index,
      master,
      computedHp: Math.round((master?.stats.hp || 100) * mult),
      computedAtk: Math.round((master?.stats.atk || 20) * mult),
      sellValue: (master?.cost || 1) * (u.star === 1 ? 1 : u.star === 2 ? 3 : 6),
    };
  }, [selectedSlot, frontRow, backRow, bench]);

  // ==========================================
  // 6. フェーズ遷移: PREP -> QUIZ -> BATTLE
  // ==========================================

  // 「稼働開始」ボタンを押したとき -> OCIクイズフェーズへ
  const handleStartRoundWithQuiz = () => {
    if (deployedUnits.length === 0) {
      showToast('盤面（前衛または後衛）に少なくとも1つのOCIサービスを配置してください！', 'error');
      return;
    }
    setSelectedSlot(null);

    // 未回答の問題を優先してランダムに1問出題
    let history = usedQuizIds;
    let pool = OCI_PRACTICE_QUIZZES.filter((q) => !history.includes(q.id));
    if (pool.length === 0) {
      // 全問出題済み: 履歴をリセットして再シャッフル（直前の問題の連続出題は避ける）
      const lastId = history[history.length - 1];
      history = [];
      pool = OCI_PRACTICE_QUIZZES.filter((q) => q.id !== lastId);
    }
    const pickedQuiz = pool[Math.floor(Math.random() * pool.length)];
    setUsedQuizIds([...history, pickedQuiz.id]);
    setCurrentQuiz(pickedQuiz);
    setSelectedChoice(null);
    setQuizAnswered(false);
    setQuizBonusActive(false);
    setPhase('QUIZ');
  };

  // クイズの選択肢をタップしたとき
  const handleSelectQuizChoice = (choiceIdx) => {
    if (quizAnswered || !currentQuiz) return;
    setSelectedChoice(choiceIdx);
    setQuizAnswered(true);
    setQuizTotalCount((prev) => prev + 1);

    const isCorrect = choiceIdx === currentQuiz.correctIndex;
    if (isCorrect) {
      setQuizCorrectCount((prev) => prev + 1);
      const reward = (currentQuiz.rewardGold ?? 3) * quizGoldMult;
      setGold((prev) => prev + reward);
      setQuizBonusActive(true);
      showToast(`クイズ正解！ボーナス予算 +${reward}G ＆ 今ラウンドの全ユニット出力 +${Math.round(quizBuffRate * 100)}%！`, 'success');
    } else {
      setQuizBonusActive(false);
    }
  };

  // クイズ確認後、オートバトルを開始！
  const startAutoBattle = () => {
    // シナジー効果の合算
    let teamSpeedMult = 1.0;
    let teamAtkMult = 1.0;
    let teamDmgReduction = 0.0;
    let teamReflect = 0.0;
    let teamShieldRatio = 0.0;
    let teamRegenPerSec = 0;

    activeSynergies.forEach((syn) => {
      if (syn.activeTier) {
        if (syn.activeTier.speedMult) teamSpeedMult = syn.activeTier.speedMult;
        if (syn.activeTier.atkMult) teamAtkMult = syn.activeTier.atkMult;
        if (syn.activeTier.dmgReduction) teamDmgReduction = syn.activeTier.dmgReduction;
        if (syn.activeTier.reflect) teamReflect = syn.activeTier.reflect;
        if (syn.activeTier.shieldRatio) teamShieldRatio = syn.activeTier.shieldRatio;
        if (syn.activeTier.regenPerSec) teamRegenPerSec = syn.activeTier.regenPerSec;
      }
    });

    // クイズ正解時はさらに出力+15%＆開幕シールド+15%
    if (quizBonusActive) {
      teamAtkMult *= 1 + quizBuffRate;
      teamShieldRatio += quizBuffRate;
    }

    // 戦闘用ユニットオブジェクトの初期化
    const combatUnits = deployedUnits.map((u) => {
      const starMult = getStarMultiplier(u.star);
      // 推奨ポジション（FRONT/BACK）通りに配置されているかチェック（不適切配置は性能-20%）
      const isRightPosition = u.row === u.master.position;
      const posMult = isRightPosition ? 1.0 : 0.8;

      const maxHp = Math.round(u.master.stats.hp * starMult * posMult);
      const atk = Math.round(u.master.stats.atk * starMult * teamAtkMult * posMult);
      const speed = +(u.master.stats.speed * teamSpeedMult).toFixed(2);
      const initialShield = Math.round(maxHp * teamShieldRatio);

      return {
        instanceId: u.instanceId,
        masterId: u.masterId,
        name: u.master.shortName,
        fullName: u.master.name,
        iconType: u.master.iconType,
        cost: u.master.cost,
        star: u.star,
        row: u.row,
        slotIndex: u.slotIndex,
        isRightPosition,
        maxHp,
        hp: maxHp,
        shield: initialShield,
        atk,
        speed,
        mana: 20,
        maxMana: u.master.skill.maxMana,
        skill: u.master.skill,
        attackProgress: Math.random() * 35,
        totalDamageDealt: 0,
        alive: true,
        reviveAvailable: hasAug('aug_dr'),
      };
    });

    // ボス弱点・対策ユニットのチェック
    const hasCounterUnit = currentEnemy.counterUnitId
      ? combatUnits.some((u) => u.masterId === currentEnemy.counterUnitId)
      : false;
    const hasCounterSynergy = currentEnemy.counterSynergy
      ? activeSynergies.some((s) => s.id === currentEnemy.counterSynergy && s.activeTier !== null)
      : false;

    let enemyEffectiveAtk = currentEnemy.atk;
    const initialLogs = [];

    if (quizBonusActive) {
      initialLogs.push(`✨ クイズ正解バフ発動：味方全体の処理火力(ATK)+${Math.round(quizBuffRate * 100)}% ＆ シールド強化！`);
    }
    if (hasAug('aug_zerotrust')) {
      enemyEffectiveAtk = Math.round(enemyEffectiveAtk * 0.8);
      initialLogs.push('🔒 ゼロトラスト・ガバナンス：敵の攻撃力 -20% ＆ 前衛の防御 +30%！');
    }
    if (hasCounterUnit) {
      enemyEffectiveAtk = Math.round(enemyEffectiveAtk * 0.7);
      initialLogs.push(`🛡️ 特効対策成功！対策サービスの配置により「${currentEnemy.name}」の攻撃威力を30%抑制！`);
    }
    if (hasCounterSynergy) {
      enemyEffectiveAtk = Math.round(enemyEffectiveAtk * 0.85);
      initialLogs.push(`🔗 シナジー対策成功！推奨アーキテクチャ構成により敵の攻撃威力を15%抑制！`);
    }

    setBattleLogs(initialLogs.slice(0, 6));
    setBattleState({
      elapsedSec: 0,
      units: combatUnits,
      enemy: {
        name: currentEnemy.name,
        maxHp: currentEnemy.hp,
        hp: currentEnemy.hp,
        atk: enemyEffectiveAtk,
        speed: currentEnemy.speed,
        attackProgress: 0,
        skillProgress: 0,
      },
      teamDmgReduction,
      teamReflect,
      teamRegenPerSec,
      autoscale: hasAug('aug_autoscale'),
      frontDefenseMult: hasAug('aug_zerotrust') ? 1 / 1.3 : 1,
      manaGainMult: hasAug('aug_cloudnative') ? 1 / 0.75 : 1,
      status: 'RUNNING',
    });

    setPhase('BATTLE');
  };

  // ==========================================
  // 7. オートバトル リアルタイム計算ループ
  // ==========================================

  useEffect(() => {
    if (phase !== 'BATTLE' || !battleState || battleState.status !== 'RUNNING') return;

    const tickMs = battleSpeed === 2 ? 125 : 250; // 0.25秒刻み (2倍速時は125ms)
    const dt = 0.25;

    const timer = setInterval(() => {
      setBattleState((prev) => {
        if (!prev || prev.status !== 'RUNNING') return prev;

        const nextElapsed = +(prev.elapsedSec + dt).toFixed(2);
        const nextUnits = prev.units.map((u) => ({ ...u }));
        const nextEnemy = { ...prev.enemy };
        const newLogEntries = [];

        // 1. 高可用性 (Multi-AD) 自動修復 (1秒ごと)
        if (prev.teamRegenPerSec > 0 && Math.floor(nextElapsed) > Math.floor(prev.elapsedSec)) {
          nextUnits.forEach((u) => {
            if (u.alive && u.hp < u.maxHp) {
              u.hp = Math.min(u.maxHp, u.hp + prev.teamRegenPerSec);
            }
          });
        }

        // ユニットがHP0になった際の処理（マルチリージョンDR: 各ユニット1度だけHP40%で復活）
        const handleDown = (target) => {
          if (target.hp > 0) return;
          if (target.reviveAvailable) {
            target.reviveAvailable = false;
            target.hp = Math.round(target.maxHp * 0.4);
            newLogEntries.push(`🌐 [${target.name}] マルチリージョンDR発動！HP40%でフェイルオーバー復旧！`);
          } else {
            target.alive = false;
            newLogEntries.push(`⚠️ [${target.name}] が高負荷によりダウンしました！`);
          }
        };
        const manaMult = prev.manaGainMult || 1;
        // オートスケーリング: 毎秒 +4%（最大+80%）の攻撃速度
        const autoscaleMult = prev.autoscale ? 1 + Math.min(0.8, Math.floor(nextElapsed) * 0.04) : 1;

        // 2. 味方ユニットの行動
        nextUnits.forEach((u) => {
          if (!u.alive || nextEnemy.hp <= 0) return;

          u.attackProgress += u.speed * autoscaleMult * dt * 48;
          if (u.attackProgress >= 100) {
            u.attackProgress -= 100;

            // 通常攻撃
            const dmg = Math.max(10, Math.round(u.atk * (0.95 + Math.random() * 0.1)));
            nextEnemy.hp = Math.max(0, nextEnemy.hp - dmg);
            u.totalDamageDealt += dmg;
            u.mana = Math.min(u.maxMana, u.mana + 25 * manaMult);

            // マナが満タンならスキル発動！
            if (u.mana >= u.maxMana && nextEnemy.hp > 0) {
              u.mana = 0;
              const starMult = getStarMultiplier(u.star);

              if (u.skill.type === 'DAMAGE') {
                const skillDmg = Math.round(u.atk * u.skill.power);
                nextEnemy.hp = Math.max(0, nextEnemy.hp - skillDmg);
                u.totalDamageDealt += skillDmg;
                newLogEntries.push(`⚡ [${u.name}] ${u.skill.name}！敵に ${skillDmg} ダメージ！`);
              } else if (u.skill.type === 'SHIELD') {
                const shieldAmt = Math.round(u.skill.power * starMult);
                u.shield += shieldAmt;
                newLogEntries.push(`🛡️ [${u.name}] ${u.skill.name}！自身に +${shieldAmt} シールド！`);
              } else if (u.skill.type === 'TEAM_SHIELD') {
                const shieldAmt = Math.round(u.skill.power * starMult);
                nextUnits.forEach((ally) => {
                  if (ally.alive) ally.shield += shieldAmt;
                });
                newLogEntries.push(`🛡️ [${u.name}] ${u.skill.name}！味方全体に +${shieldAmt} シールド！`);
              } else if (u.skill.type === 'HEAL_ATTACK' || u.skill.type === 'HYBRID' || u.skill.type === 'ECON_BUFF') {
                const healAmt = Math.round(140 * starMult);
                u.hp = Math.min(u.maxHp, u.hp + healAmt);
                const bonusDmg = Math.round(u.atk * 1.8);
                nextEnemy.hp = Math.max(0, nextEnemy.hp - bonusDmg);
                u.totalDamageDealt += bonusDmg;
                newLogEntries.push(`✨ [${u.name}] ${u.skill.name}！HP修復 ＆ ${bonusDmg} ダメージ！`);
              }
            }
          }
        });

        // 3. 敵ボスの行動（前衛が生存していれば前衛を優先攻撃、前衛全滅で後衛へ直撃）
        if (nextEnemy.hp > 0) {
          nextEnemy.attackProgress += nextEnemy.speed * dt * 42;
          nextEnemy.skillProgress += dt * 20;

          if (nextEnemy.attackProgress >= 100) {
            nextEnemy.attackProgress -= 100;

            const aliveFront = nextUnits.filter((u) => u.alive && u.row === 'FRONT');
            const aliveBack = nextUnits.filter((u) => u.alive && u.row === 'BACK');
            const targetPool = aliveFront.length > 0 ? aliveFront : aliveBack;

            if (targetPool.length > 0) {
              const target = targetPool[Math.floor(Math.random() * targetPool.length)];
              // 前衛不在で後衛が直接殴られる場合はペナルティとして被ダメージ1.25倍
              const unguardedPenalty = aliveFront.length === 0 ? 1.25 : 1.0;
              const defMult = target.row === 'FRONT' ? prev.frontDefenseMult || 1 : 1;
              const rawDmg = Math.round(nextEnemy.atk * unguardedPenalty * (1 - prev.teamDmgReduction) * defMult);

              // シールドで優先吸収
              let remainingDmg = rawDmg;
              if (target.shield > 0) {
                const absorbed = Math.min(target.shield, remainingDmg);
                target.shield -= absorbed;
                remainingDmg -= absorbed;
              }
              target.hp = Math.max(0, target.hp - remainingDmg);
              target.mana = Math.min(target.maxMana, target.mana + 15 * manaMult);

              // セキュリティシナジーのダメージ反射
              if (prev.teamReflect > 0) {
                const reflectDmg = Math.round(rawDmg * prev.teamReflect);
                nextEnemy.hp = Math.max(0, nextEnemy.hp - reflectDmg);
                target.totalDamageDealt += reflectDmg;
              }

              handleDown(target);
            }
          }

          // 5秒ごとに敵の全体スパイク攻撃
          if (nextEnemy.skillProgress >= 100 && nextEnemy.hp > 0) {
            nextEnemy.skillProgress = 0;
            const aoeDmg = Math.round(nextEnemy.atk * 0.65 * (1 - prev.teamDmgReduction));
            nextUnits.forEach((u) => {
              if (!u.alive) return;
              let rem = u.row === 'FRONT' ? Math.round(aoeDmg * (prev.frontDefenseMult || 1)) : aoeDmg;
              if (u.shield > 0) {
                const abs = Math.min(u.shield, rem);
                u.shield -= abs;
                rem -= abs;
              }
              u.hp = Math.max(0, u.hp - rem);
              handleDown(u);
            });
            newLogEntries.push(`🚨 敵の全体スパイク負荷攻撃！味方全体に ${aoeDmg} ダメージ！`);
          }
        }

        if (newLogEntries.length > 0) {
          setBattleLogs((old) => [...newLogEntries, ...old].slice(0, 12));
        }

        // 4. 勝敗判定
        const anyUnitAlive = nextUnits.some((u) => u.alive);
        if (nextEnemy.hp <= 0) {
          return { ...prev, elapsedSec: nextElapsed, units: nextUnits, enemy: nextEnemy, status: 'WON' };
        }
        if (!anyUnitAlive || nextElapsed >= 45) {
          return { ...prev, elapsedSec: nextElapsed, units: nextUnits, enemy: nextEnemy, status: 'LOST' };
        }

        return {
          ...prev,
          elapsedSec: nextElapsed,
          units: nextUnits,
          enemy: nextEnemy,
        };
      });
    }, tickMs);

    return () => clearInterval(timer);
  }, [phase, battleState, battleSpeed]);

  // 戦闘決着時のリザルト計算と利子精算
  useEffect(() => {
    if (phase !== 'BATTLE' || !battleState) return;
    if (battleState.status !== 'WON' && battleState.status !== 'LOST') return;

    const isVictory = battleState.status === 'WON';
    const baseIncome = 5;
    const interestIncome = calcInterest(gold);
    // Object Storage を盤面に配置していれば1体につき +1G（★2なら+2G）
    const objStorageBonus = deployedUnits
      .filter((u) => u.masterId === 'oci_obj_storage')
      .reduce((acc, u) => acc + u.star, 0);

    const totalEarnedGold = baseIncome + interestIncome + objStorageBonus;

    // 敗北時は敵の残りHP割合に応じてSLA稼働率が低下
    let slaPenalty = 0;
    if (!isVictory) {
      const remainingRatio = battleState.enemy.hp / battleState.enemy.maxHp;
      slaPenalty = Math.max(15, Math.round(remainingRatio * 35));
    }

    const timer = setTimeout(() => {
      const nextSla = Math.max(0, slaHp - slaPenalty);
      setSlaHp(nextSla);
      setGold((prev) => prev + totalEarnedGold);

      // ラウンド終了時に自動EXP +2
      const leveledUp = level < MAX_LEVEL && applyExpGain(2) > level;

      setRoundResult({
        isVictory,
        baseIncome,
        interestIncome,
        objStorageBonus,
        totalEarnedGold,
        slaPenalty,
        leveledUp,
        mvpUnit: [...battleState.units].sort((a, b) => b.totalDamageDealt - a.totalDamageDealt)[0] || null,
      });

      if (nextSla <= 0) {
        setPhase('GAMEOVER');
      } else if (isVictory && round >= TOTAL_ROUNDS) {
        setPhase('VICTORY');
      } else {
        setPhase('RESULT');
      }
    }, 700);

    return () => clearTimeout(timer);
  }, [battleState?.status]);

  // 次のラウンドの準備フェーズへ進む
  // リザーブド・キャパシティ: ベンチに空きがあればコスト1〜2の★1ユニットを1体無償配備
  const grantReservedUnit = () => {
    const emptyIdx = bench.findIndex((s) => s === null);
    if (emptyIdx === -1) {
      showToast('リザーブド・キャパシティ: ベンチが満杯のため無償配備はスキップされました', 'info');
      return;
    }
    const candidates = UNIT_MASTERS.filter((m) => m.cost <= 2);
    const picked = candidates[Math.floor(Math.random() * candidates.length)];
    const nextBench = [...bench];
    nextBench[emptyIdx] = {
      instanceId: `reserved_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      masterId: picked.id,
      star: 1,
    };
    const { f, b, ben, mergedAny, mergeLogText } = tryAutoMergeUnits(frontRow, backRow, nextBench);
    setFrontRow(f);
    setBackRow(b);
    setBench(ben.slice(0, 8));
    showToast(mergedAny ? mergeLogText : `リザーブド・キャパシティ: ${picked.shortName} を無償配備！`, 'success');
  };

  // 未取得の戦略プールからランダムに3枚を抽選
  const drawAugmentChoices = () => {
    const pool = AUGMENT_POOL.filter((a) => !activeAugments.includes(a.id));
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  };

  // 設計戦略を選択・決定
  const handleSelectAugment = (aug) => {
    setActiveAugments((prev) => [...prev, aug.id]);
    setAugmentChoices(null);
    if (aug.id === 'aug_enterprise') {
      setGold((prev) => prev + 15);
    }
    if (aug.id === 'aug_reserved') {
      grantReservedUnit();
    }
    showToast(`設計戦略「${aug.name}」を獲得しました！`, 'success');
  };

  const handleProceedToNextRound = () => {
    const nextRoundNum = Math.min(round + 1, TOTAL_ROUNDS);
    setRound(nextRoundNum);
    if (!shopLocked) {
      setShop(generateShopCards(level));
    }
    setRoundResult(null);
    setBattleState(null);
    setQuizBonusActive(false);
    setPhase('PREP');

    // 毎ラウンド開始時: リザーブド・キャパシティの無償配備
    if (hasAug('aug_reserved')) {
      grantReservedUnit();
    }
    // Round 4 / 10 / 15 の準備フェーズ開始時: 設計戦略の選択モーダルを表示
    if (nextRoundNum !== round && AUGMENT_ROUNDS.includes(nextRoundNum) && activeAugments.length < MAX_AUGMENTS) {
      const choices = drawAugmentChoices();
      if (choices.length > 0) setAugmentChoices(choices);
    }
  };

  // ゲームを最初からリセット
  const handleResetGame = () => {
    setPhase('PREP');
    setRound(1);
    setSlaHp(100);
    setGold(12);
    setLevel(3);
    setExp(0);
    setFrontRow([
      { instanceId: 'init_vcn_1', masterId: 'oci_vcn', star: 1 },
      null,
      null,
      null,
    ]);
    setBackRow([
      { instanceId: 'init_comp_1', masterId: 'oci_compute', star: 1 },
      null,
      null,
      null,
      null,
      null,
    ]);
    setBench(Array(8).fill(null));
    setShop(generateShopCards(3));
    setSelectedSlot(null);
    setBattleState(null);
    setRoundResult(null);
    setActiveAugments([]);
    setAugmentChoices([...AUGMENT_POOL].sort(() => Math.random() - 0.5).slice(0, 3));
    setAugmentInfoId(null);
    showToast('新規テナンシ環境をプロビジョニングしました！', 'info');
  };

  // ==========================================
  // 8. サブUI描画: 盤面スロット（PREP時 & BATTLE時）
  // ==========================================

  const renderBoardSlot = (rowType, slotIndex) => {
    const unit = rowType === 'FRONT' ? frontRow[slotIndex] : backRow[slotIndex];
    const master = unit ? UNIT_MASTERS.find((m) => m.id === unit.masterId) : null;
    const isSelected = selectedSlot?.area === rowType && selectedSlot?.index === slotIndex;

    // バトル中はリアルタイムHP・シールド・ゲージを表示
    const combatUnit =
      phase === 'BATTLE' && battleState
        ? battleState.units.find((cu) => cu.row === rowType && cu.slotIndex === slotIndex)
        : null;

    // 選択中のユニットがある場合、その推奨ポジションと一致する空きマスをハイライト
    const isRecommendedTarget =
      selectedUnitDetail &&
      selectedUnitDetail.master?.position === rowType &&
      !(selectedSlot?.area === rowType && selectedSlot?.index === slotIndex);

    return (
      <button
        key={`${rowType}_${slotIndex}`}
        onClick={() => handleSlotTap(rowType, slotIndex)}
        disabled={phase !== 'PREP'}
        className={`relative group flex flex-col justify-between p-1 rounded-lg border transition-all duration-150 min-h-[62px] text-left select-none overflow-hidden ${
          isSelected
            ? 'ring-2 ring-amber-400 border-amber-400 bg-amber-500/20 scale-[1.02]'
            : unit
            ? `${getCardBorderByCost(master.cost)} bg-slate-800/90`
            : isRecommendedTarget
            ? 'border-dashed border-cyan-400/80 bg-cyan-950/30 hover:bg-cyan-900/40'
            : 'border-dashed border-slate-700/80 bg-slate-900/50 hover:border-slate-500'
        }`}
      >
        {/* 空きスロット表示 */}
        {!unit && (
          <div className="flex flex-col items-center justify-center h-full w-full opacity-45 group-hover:opacity-75">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              {rowType === 'FRONT' ? `Public #${slotIndex + 1}` : `Private #${slotIndex + 1}`}
            </span>
            <span className="text-[10px] text-slate-500 mt-0.5">
              {selectedUnitDetail ? 'タップして配置' : rowType === 'FRONT' ? '前衛(エッジ)' : '後衛(内部)'}
            </span>
          </div>
        )}

        {/* 配置済みユニット表示 */}
        {unit && master && (
          <>
            {/* 上段：★ランクと推奨配置チェック */}
            <div className="flex items-center justify-between w-full gap-1">
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  unit.star === 3
                    ? 'bg-amber-500 text-slate-950'
                    : unit.star === 2
                    ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/50'
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                {getStarLabel(unit.star)}
              </span>

              {master.position !== rowType && (
                <span
                  title="推奨サブネット外のため性能-20%"
                  className="text-[9px] bg-rose-500/30 text-rose-300 border border-rose-500/50 px-1 rounded"
                >
                  非推奨枠
                </span>
              )}
            </div>

            {/* 中段：アイコンとサービス名 */}
            <div className="flex items-center gap-1 my-0.5">
              <div className={`p-1 rounded-md ${getCostBadgeStyle(master.cost)}`}>
                {renderServiceIcon(master.iconType, 'w-4 h-4')}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-100 truncate leading-tight">{master.shortName}</div>
                <div className="text-[10px] text-slate-400 truncate">
                  {phase === 'BATTLE' && combatUnit
                    ? combatUnit.alive
                      ? `ATK ${combatUnit.atk}`
                      : 'DOWN'
                    : `HP ${Math.round(master.stats.hp * getStarMultiplier(unit.star))} / ATK ${Math.round(
                        master.stats.atk * getStarMultiplier(unit.star)
                      )}`}
                </div>
              </div>
            </div>

            {/* 下段：PREP時はシナジーバッジ、BATTLE時はHP/シールド/マナバー */}
            {phase === 'BATTLE' && combatUnit ? (
              <div className="w-full space-y-1 mt-0.5">
                {/* HP + Shield Bar */}
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden flex">
                  <div
                    className={`h-full transition-all duration-150 ${
                      combatUnit.hp / combatUnit.maxHp > 0.5
                        ? 'bg-emerald-500'
                        : combatUnit.hp / combatUnit.maxHp > 0.25
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${Math.max(0, (combatUnit.hp / combatUnit.maxHp) * 100)}%` }}
                  />
                  {combatUnit.shield > 0 && (
                    <div
                      className="h-full bg-cyan-300"
                      style={{ width: `${Math.min(100, (combatUnit.shield / combatUnit.maxHp) * 100)}%` }}
                    />
                  )}
                </div>
                {/* Mana Bar */}
                <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 transition-all duration-150"
                    style={{ width: `${Math.min(100, (combatUnit.mana / combatUnit.maxMana) * 100)}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1 flex-wrap">
                {master.synergies.map((synId) => {
                  const syn = SYNERGY_MASTERS[synId];
                  return (
                    <span
                      key={synId}
                      className={`text-[9px] px-1.5 py-0.5 rounded border ${syn.bgColor} ${syn.color} ${syn.borderColor}`}
                    >
                      {syn.name.slice(0, 4)}
                    </span>
                  );
                })}
              </div>
            )}

            {/* 戦闘不能オーバーレイ */}
            {phase === 'BATTLE' && combatUnit && !combatUnit.alive && (
              <div className="absolute inset-0 bg-slate-950/80 rounded-xl flex items-center justify-center">
                <span className="text-xs font-bold text-rose-400 border border-rose-500/40 bg-rose-950/60 px-2 py-0.5 rounded">
                  停止中 (SPOF)
                </span>
              </div>
            )}
          </>
        )}
      </button>
    );
  };

  // ==========================================
  // 9. 全体レイアウト描画
  // ==========================================

  return (
    <div className="h-screen max-h-screen overflow-hidden p-2 gap-1.5 bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* トースト通知（画面上部中央） */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-bounce">
          <div
            className={`px-4 py-2 rounded-full border shadow-xl text-xs sm:text-sm font-bold flex items-center gap-2 ${
              toastMessage.type === 'error'
                ? 'bg-rose-950/95 border-rose-500 text-rose-200'
                : toastMessage.type === 'success'
                ? 'bg-emerald-950/95 border-emerald-400 text-emerald-200'
                : 'bg-slate-900/95 border-cyan-400 text-cyan-200'
            }`}
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* ==========================================
          エリア1: トップステータスバー (SLA稼働率 / 予算・利子 / キャパシティ / 操作メニュー)
          ========================================== */}
      <header className="shrink-0 bg-slate-900/95 border border-slate-800 rounded-lg px-2 py-1 z-30">
        <div className="flex items-center justify-between gap-2">
          {/* 左：タイトル */}
          <div className="flex items-center gap-1.5">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-1 rounded-md shadow-sm">
              <Server className="w-4 h-4 text-slate-950" />
            </div>
            <div className="flex flex-col leading-none">
              <h1 className="text-xs font-extrabold tracking-tight text-white whitespace-nowrap">
                アーキテクトタクティクス
              </h1>
              <span className="mt-0.5 text-[8px] font-semibold tracking-wider text-cyan-400 whitespace-nowrap">
                OCI Edition (MVP v1.0)
              </span>
            </div>
          </div>

          {/* 中央：ステージ進行 数直線 */}
          <div className="flex-1 min-w-0 px-2">
            <div className="flex items-center justify-center">
              {Array.from({ length: TOTAL_ROUNDS }, (_, i) => i + 1).map((n) => {
                const done = round > n;
                const current = round === n;
                const isBoss = BOSS_ROUNDS.includes(n);
                const stageStart = n > 1 && (n - 1) % STAGE_ROUNDS === 0;
                const size = isBoss ? 'w-6 h-6' : 'w-4 h-4';
                const color = done
                  ? 'bg-emerald-500 border-emerald-300 text-slate-950'
                  : current
                  ? 'bg-cyan-400 border-cyan-200 text-slate-950 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.9)]'
                  : 'bg-slate-800 border-slate-600 text-slate-500';
                return (
                  <React.Fragment key={n}>
                    {stageStart && <div className="w-px h-5 bg-amber-400/70 mx-1 shrink-0" />}
                    <div
                      title={isBoss ? `ボス (ROUND ${n})` : `通常戦 (ROUND ${n})`}
                      className={`${size} rounded-full border-2 flex items-center justify-center text-[8px] font-extrabold shrink-0 ${color}`}
                    >
                      {isBoss ? '👑' : n}
                    </div>
                    {n < TOTAL_ROUNDS && n % STAGE_ROUNDS !== 0 && (
                      <div className={`h-0.5 w-1.5 sm:w-3 shrink ${round > n ? 'bg-emerald-500' : 'bg-slate-700'}`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            <div className="text-center text-[9px] font-mono text-cyan-300 leading-none mt-0.5">{roundLabel(round)}</div>
            {activeAugments.length > 0 && (
              <div className="flex items-center justify-center gap-1 mt-0.5">
                {activeAugments.map((id) => {
                  const aug = AUGMENT_POOL.find((a) => a.id === id);
                  if (!aug) return null;
                  const Icon = AUGMENT_ICONS[aug.iconName] || Sparkles;
                  return (
                    <button
                      key={id}
                      onClick={() => setAugmentInfoId(id)}
                      className={`flex items-center gap-1 px-1.5 py-0 rounded-full border text-[9px] font-bold max-w-[96px] ${AUGMENT_TIER_STYLE[aug.tier]}`}
                      title={aug.description}
                    >
                      <Icon className="w-3 h-3 shrink-0" />
                      <span className="truncate">{aug.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 中央：SLA稼働率・所持クレジット(利子)・配置枠・クイズ正答率 */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* SLA稼働率 */}
            <div className="bg-slate-800/90 border border-slate-700 rounded-lg px-2.5 py-1 flex items-center gap-2">
              <Activity className={`w-4 h-4 ${slaHp > 50 ? 'text-emerald-400' : 'text-rose-400'}`} />
              <div>
                <div className="text-[10px] text-slate-400 leading-none">SLA稼働率</div>
                <div className="text-xs sm:text-sm font-bold text-emerald-300">{slaHp}%</div>
              </div>
            </div>

            {/* クラウド予算＆利子 */}
            <div className="bg-slate-800/90 border border-amber-500/40 rounded-lg px-2.5 py-1 flex items-center gap-2">
              <Coins className="w-4 h-4 text-amber-400" />
              <div>
                <div className="text-[10px] text-slate-400 leading-none">予算 (利子+{currentInterest}G)</div>
                <div className="text-xs sm:text-sm font-extrabold text-amber-300">{gold} G</div>
              </div>
            </div>

            {/* 配置キャパシティ */}
            <div className="bg-slate-800/90 border border-cyan-500/40 rounded-lg px-2.5 py-1 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <div>
                <div className="text-[10px] text-slate-400 leading-none">
                  稼働枠 Lv.{level} ({exp}/{expNeededForNextLevel})
                </div>
                <div className="text-xs sm:text-sm font-bold text-cyan-300">
                  {deployedUnits.length} / {level} 枠
                </div>
              </div>
            </div>

            {/* クイズ戦績 */}
            <div className="hidden md:flex bg-slate-800/90 border border-slate-700 rounded-lg px-2.5 py-1 items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-400" />
              <div>
                <div className="text-[10px] text-slate-400 leading-none">OCIクイズ正答</div>
                <div className="text-xs font-bold text-purple-300">
                  {quizCorrectCount} / {quizTotalCount} 問
                </div>
              </div>
            </div>
          </div>

          {/* 右：サービス図鑑・JSONデータ・iPadデプロイ手順ボタン */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveModal('CATALOG')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1 transition"
              title="OCI 15サービス一覧"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">OCI図鑑</span>
            </button>
            <button
              onClick={() => setActiveModal('JSON')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1 transition"
              title="データ駆動JSON構造を確認"
            >
              <Code className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">データ構造</span>
            </button>
            <button
              onClick={() => setActiveModal('GUIDE')}
              className="px-2.5 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/50 text-xs font-bold text-cyan-200 flex items-center gap-1 transition"
            >
              <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">デプロイ</span>
            </button>
            <button
              onClick={() => setShowHelp(true)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 transition"
              title="操作ガイド"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetGame}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/60 border border-slate-700 hover:border-rose-500/50 text-slate-400 hover:text-rose-300 transition"
              title="最初からやり直す"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ==========================================
          メインコンテンツ (エリア2: 盤面エリア + エリア3: シナジー＆ログパネル)
          ========================================== */}
      <main className="flex-1 min-h-0 w-full grid grid-cols-12 gap-2">
        {/* 左〜中央 (9カラム): 敵脅威情報 + 前衛4枠 + 後衛6枠 */}
        <div className="col-span-9 min-h-0 flex flex-col gap-1.5">
          {/* 1. 敵（インシデント・攻撃ボス）表示パネル */}
          <div className="shrink-0 bg-gradient-to-r from-slate-900 via-rose-950/30 to-slate-900 border border-rose-500/40 rounded-lg p-1.5 shadow-inner">
            <div className="flex flex-row items-center justify-between gap-2">
              <div className="flex items-start gap-2 min-w-0">
                <div className="p-1 rounded-lg bg-rose-500/20 border border-rose-500/50 text-rose-400 shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-500/30 text-rose-200 px-2 py-0.5 rounded">
                      {roundLabel(round)} THREAT
                    </span>
                    <h2 className="text-sm sm:text-base font-extrabold text-white">{currentEnemy.name}</h2>
                  </div>
                  <p className="text-[10px] text-amber-300/90 mt-0.5 flex items-center gap-1">
                    <Info className="w-3 h-3 shrink-0" />
                    <span className="truncate">{currentEnemy.weaknessText}</span>
                  </p>
                </div>
              </div>

              {/* 敵ステータス & バトル中HPバー */}
              <div className="w-56 shrink-0 bg-slate-950/80 border border-slate-800 rounded-md p-1.5">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-400 font-medium">脅威耐久値 (HP)</span>
                  <span className="font-mono font-bold text-rose-300">
                    {phase === 'BATTLE' && battleState
                      ? `${battleState.enemy.hp.toLocaleString()} / ${battleState.enemy.maxHp.toLocaleString()}`
                      : `${currentEnemy.hp.toLocaleString()}`}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-rose-600 to-amber-500 transition-all duration-150"
                    style={{
                      width:
                        phase === 'BATTLE' && battleState
                          ? `${Math.max(0, (battleState.enemy.hp / battleState.enemy.maxHp) * 100)}%`
                          : '100%',
                    }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1.5">
                  <span>敵攻撃力: {currentEnemy.atk}</span>
                  <span>速度: {currentEnemy.speed}x</span>
                  {phase === 'BATTLE' && (
                    <button
                      onClick={() => setBattleSpeed((s) => (s === 1 ? 2 : 1))}
                      className="px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-400 text-cyan-200 font-bold flex items-center gap-1"
                    >
                      <FastForward className="w-3 h-3" />
                      {battleSpeed}x倍速
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 2. プレイヤー盤面（前衛4枠・後衛6枠） */}
          <div className="flex-1 min-h-0 bg-slate-900/90 border border-slate-800 rounded-lg p-1.5 flex flex-col justify-around gap-1">
            {/* 前衛 */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-cyan-300 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  前衛 (4枠)
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{frontRow.filter(Boolean).length}/4</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[0, 1, 2, 3].map((idx) => renderBoardSlot('FRONT', idx))}
              </div>
            </div>

            {/* 後衛 */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                  <Cpu className="w-3 h-3" />
                  後衛 (6枠)
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{backRow.filter(Boolean).length}/6</span>
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {[0, 1, 2, 3, 4, 5].map((idx) => renderBoardSlot('BACK', idx))}
              </div>
            </div>
          </div>
        </div>

        {/* 右パネル (3カラム): 発動中シナジー（絆） + 選択中ユニット詳細 or バトルログ */}
        <div className="col-span-3 min-h-0 flex flex-col gap-1.5">
          {/* シナジー（絆）一覧カード */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-1.5 min-h-0 flex-1 overflow-y-auto">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                アーキテクチャ絆 (Synergies)
              </h3>
              
            </div>

            <div className="space-y-1">
              {activeSynergies.map((syn) => {
                const isActive = syn.activeTier !== null;
                return (
                  <div
                    key={syn.id}
                    className={`p-1 rounded-md border transition ${
                      isActive
                        ? `${syn.bgColor} ${syn.borderColor}`
                        : 'bg-slate-950/60 border-slate-800/80 opacity-75'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className={syn.color}>{renderServiceIcon(syn.iconName, 'w-4 h-4')}</span>
                        <span className="text-xs font-bold text-white">{syn.name}</span>
                      </div>
                      <span
                        className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                          isActive ? 'bg-slate-950/80 text-amber-300' : 'text-slate-400'
                        }`}
                      >
                        {syn.count} / 4
                      </span>
                    </div>
                    <div className="mt-0.5 flex flex-wrap gap-0.5">
                      {syn.thresholds.map((t) => {
                        const reached = syn.count >= t.count;
                        return (
                          <span
                            key={t.count}
                            className={`text-[10px] px-1.5 py-0.5 rounded ${
                              reached
                                ? 'bg-amber-400/20 text-amber-200 font-bold border border-amber-400/40'
                                : 'bg-slate-900 text-slate-400'
                            }`}
                          >
                            {t.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 選択中ユニットのインスペクタ または リアルタイム戦闘ログ */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-1.5 shrink-0 h-36 overflow-y-auto flex flex-col justify-between">
            {phase === 'PREP' && selectedUnitDetail ? (
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                  <div>
                    <span className="text-[10px] text-amber-300 font-bold">{getStarLabel(selectedUnitDetail.star)}</span>
                    <h4 className="text-sm font-extrabold text-white">{selectedUnitDetail.master?.name}</h4>
                  </div>
                  <button
                    onClick={handleSellSelectedUnit}
                    className="px-2.5 py-1 rounded-lg bg-rose-600/20 hover:bg-rose-600/40 border border-rose-500/60 text-rose-200 text-xs font-bold flex items-center gap-1 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    売却 (+{selectedUnitDetail.sellValue}G)
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-1.5 text-center mb-2">
                  <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
                    <div className="text-[10px] text-slate-400">推奨配置</div>
                    <div className="text-xs font-bold text-cyan-300">
                      {selectedUnitDetail.master?.position === 'FRONT' ? '前衛(FRONT)' : '後衛(BACK)'}
                    </div>
                  </div>
                  <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
                    <div className="text-[10px] text-slate-400">耐久 HP</div>
                    <div className="text-xs font-bold text-emerald-300">{selectedUnitDetail.computedHp}</div>
                  </div>
                  <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
                    <div className="text-[10px] text-slate-400">処理力 ATK</div>
                    <div className="text-xs font-bold text-amber-300">{selectedUnitDetail.computedAtk}</div>
                  </div>
                </div>

                <div className="bg-slate-950/90 border border-slate-800 rounded-lg p-2 mb-2">
                  <div className="text-[11px] font-bold text-cyan-300">
                    スキル: {selectedUnitDetail.master?.skill.name}
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                    {selectedUnitDetail.master?.skill.description}
                  </p>
                </div>

                <div className="text-[11px] text-slate-400 bg-slate-950/50 p-2 rounded border border-slate-800/60">
                  <strong className="text-slate-200">OCI仕様メモ: </strong>
                  {selectedUnitDetail.master?.ociNote}
                </div>
              </div>
            ) : phase === 'BATTLE' ? (
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5" />
                    リアルタイム稼働ログ
                  </h4>
                  <span className="text-[11px] font-mono text-slate-400">{battleState?.elapsedSec || 0}s</span>
                </div>
                <div className="flex-1 bg-slate-950 rounded-lg p-2 border border-slate-800 overflow-y-auto max-h-24 space-y-1">
                  {battleLogs.length === 0 ? (
                    <p className="text-xs text-slate-500">トラフィック処理を開始中...</p>
                  ) : (
                    battleLogs.map((log, i) => (
                      <div key={i} className="text-[11px] text-slate-300 border-b border-slate-900 pb-1">
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <p className="text-[10px] text-slate-500 m-auto text-center">ユニットをタップで詳細表示<br/>（? で操作ガイド）</p>
                          )}
          </div>
        </div>
      </main>

      {/* ==========================================
          エリア4: ボトムドック (待機ベンチ8枠 + ショップ5枠 + 操作ボタン)
          ========================================== */}
      <footer className="shrink-0 bg-slate-900/95 border border-slate-800 rounded-lg px-2 py-1.5">
        <div className="flex flex-col gap-1">
          {/* 上段：待機ベンチ (8枠) */}
          <div>
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[11px] font-bold text-slate-300">待機ベンチ (8枠)</span>
              {selectedUnitDetail && (
                <button
                  onClick={() => setSelectedSlot(null)}
                  className="text-[11px] text-amber-300 underline hover:text-amber-200"
                >
                  選択解除
                </button>
              )}
            </div>

            <div className="grid grid-cols-8 gap-1">
              {bench.map((unit, idx) => {
                const master = unit ? UNIT_MASTERS.find((m) => m.id === unit.masterId) : null;
                const isSelected = selectedSlot?.area === 'BENCH' && selectedSlot?.index === idx;
                return (
                  <button
                    key={`bench_${idx}`}
                    onClick={() => handleSlotTap('BENCH', idx)}
                    disabled={phase !== 'PREP'}
                    className={`h-11 rounded-md border p-1 flex flex-col justify-between text-left transition ${
                      isSelected
                        ? 'ring-2 ring-amber-400 border-amber-400 bg-amber-500/20'
                        : unit && master
                        ? `${getCardBorderByCost(master.cost)} bg-slate-800`
                        : 'border-dashed border-slate-700/70 bg-slate-950/50 hover:border-slate-500'
                    }`}
                  >
                    {!unit || !master ? (
                      <span className="text-[10px] text-slate-600 m-auto font-mono">BENCH #{idx + 1}</span>
                    ) : (
                      <>
                        <div className="flex items-center justify-between w-full">
                          <span className="text-[9px] font-bold px-1 rounded bg-slate-900 text-amber-300">
                            ★{unit.star}
                          </span>
                          <span className="text-[9px] font-mono text-slate-400">
                            {master.position === 'FRONT' ? '前衛' : '後衛'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 truncate">
                          <span className="text-cyan-300 shrink-0">{renderServiceIcon(master.iconType, 'w-3.5 h-3.5')}</span>
                          <span className="text-[11px] font-bold text-white truncate">{master.shortName}</span>
                        </div>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 下段：ショップカード (5枠) + アクションボタン群 */}
          <div className="grid grid-cols-12 gap-1.5 items-stretch">
            {/* ショップ 5枚 (9カラム) */}
            <div className="col-span-9 grid grid-cols-5 gap-1.5">
              {shop.map((masterId, sIdx) => {
                const master = masterId ? UNIT_MASTERS.find((m) => m.id === masterId) : null;
                if (!master) {
                  return (
                    <div
                      key={`shop_empty_${sIdx}`}
                      className="rounded-lg border border-slate-800 bg-slate-950/40 flex items-center justify-center min-h-[72px]"
                    >
                      <span className="text-xs text-slate-600 font-mono">SOLD OUT</span>
                    </div>
                  );
                }

                const owned = unitOwnershipCounts[master.id] || { star1: 0, star2: 0, star3: 0 };
                const almostStar2 = owned.star1 === 2;
                const canAfford = gold >= master.cost;

                return (
                  <button
                    key={`shop_${sIdx}`}
                    onClick={() => handleBuyUnit(sIdx)}
                    disabled={phase !== 'PREP'}
                    className={`relative rounded-lg border p-1.5 flex flex-col justify-between text-left transition-all ${getCardBorderByCost(
                      master.cost
                    )} ${
                      canAfford
                        ? 'bg-slate-800/95 hover:-translate-y-0.5 active:translate-y-0'
                        : 'bg-slate-900/60 opacity-65'
                    }`}
                  >
                    {/* あと1体で★2合成バッジ */}
                    {almostStar2 && (
                      <div className="absolute -top-2 right-2 bg-amber-400 text-slate-950 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full shadow animate-pulse">
                        あと1つで★2！
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span
                          className={`text-[10px] font-bold px-1 rounded border ${getCostBadgeStyle(
                            master.cost
                          )}`}
                        >
                          Cost {master.cost}G
                        </span>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            master.position === 'FRONT'
                              ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                              : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                          }`}
                        >
                          {master.position === 'FRONT' ? '前衛' : '後衛'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 my-0.5">
                        <div className="text-cyan-300">{renderServiceIcon(master.iconType, 'w-4 h-4')}</div>
                        <div className="text-xs font-extrabold text-white truncate">{master.shortName}</div>
                      </div>
                    </div>

                    <div className="space-y-0.5 mt-0.5">
                      <div className="flex flex-wrap gap-0.5">
                        {master.synergies.map((synId) => {
                          const syn = SYNERGY_MASTERS[synId];
                          return (
                            <span
                              key={synId}
                              className={`text-[9px] px-1 py-0.5 rounded ${syn.bgColor} ${syn.color}`}
                            >
                              {syn.name.slice(0, 4)}
                            </span>
                          );
                        })}
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5 border-t border-slate-700/60">
                        <span>HP {master.stats.hp}</span>
                        <span>ATK {master.stats.atk}</span>
                        {(owned.star1 > 0 || owned.star2 > 0) && (
                          <span className="text-amber-300 font-bold">
                            所持:{owned.star1 + owned.star2 * 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 操作ボタン群 (3カラム) */}
            <div className="col-span-3 flex flex-col gap-1 justify-between">
              <div className="grid grid-cols-2 gap-1 flex-1">
                <button
                  onClick={handleRefreshShop}
                  disabled={phase !== 'PREP'}
                  className="rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-600 disabled:opacity-50 border border-slate-600 p-1 flex flex-col items-center justify-center transition"
                >
                  <div className="flex items-center gap-1 text-[11px] font-bold text-cyan-300">
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>ショップ更新</span>
                  </div>
                  <span className="text-[11px] text-amber-300 font-mono mt-0.5">-{refreshCost} G</span>
                </button>

                <button
                  onClick={handleBuyExp}
                  disabled={phase !== 'PREP'}
                  className="rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-600 disabled:opacity-50 border border-slate-600 p-1 flex flex-col items-center justify-center transition"
                >
                  <div className="flex items-center gap-1 text-[11px] font-bold text-purple-300">
                    <ArrowUpCircle className="w-3.5 h-3.5" />
                    <span>枠拡張 (EXP)</span>
                  </div>
                  <span className="text-[11px] text-amber-300 font-mono mt-0.5">-4 G (+4 EXP)</span>
                </button>
              </div>

              <button
                onClick={handleStartRoundWithQuiz}
                disabled={phase !== 'PREP'}
                className="flex-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-slate-950 font-extrabold py-1.5 px-2 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition"
              >
                <Play className="w-4 h-4 fill-current" />
                <span className="text-xs">稼働開始 (クイズ＆戦闘)</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* 設計戦略（オーグメント）選択モーダル: Round 3 / 7 の準備フェーズ開始時 */}
      {augmentChoices && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-amber-400/60 rounded-2xl max-w-3xl w-full p-4 shadow-2xl space-y-3">
            <div className="text-center">
              <h3 className="text-base font-extrabold text-amber-300 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                設計戦略を選択してください
              </h3>
              <p className="text-[11px] text-slate-400">{roundLabel(round)} / 1枚選ぶとこのテナンシ構成に永続適用されます</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {augmentChoices.map((aug) => {
                const Icon = AUGMENT_ICONS[aug.iconName] || Sparkles;
                return (
                  <button
                    key={aug.id}
                    onClick={() => handleSelectAugment(aug)}
                    className={`rounded-xl border-2 p-3 text-left flex flex-col gap-1.5 hover:-translate-y-0.5 active:translate-y-0 transition ${AUGMENT_TIER_STYLE[aug.tier]}`}
                  >
                    <div className="flex items-center justify-between">
                      <Icon className="w-6 h-6" />
                      <span className="text-[10px] font-mono font-bold opacity-80">{aug.tier}</span>
                    </div>
                    <div className="text-sm font-extrabold leading-tight">{aug.name}</div>
                    <span className="self-start text-[10px] px-1.5 rounded bg-slate-950/60 border border-slate-700">{aug.category}</span>
                    <p className="text-[11px] leading-relaxed text-slate-300">{aug.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 獲得済み設計戦略の効果確認モーダル */}
      {augmentInfoId && (() => {
        const aug = AUGMENT_POOL.find((a) => a.id === augmentInfoId);
        if (!aug) return null;
        const Icon = AUGMENT_ICONS[aug.iconName] || Sparkles;
        return (
          <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4" onClick={() => setAugmentInfoId(null)}>
            <div className={`rounded-xl border-2 max-w-sm w-full p-4 space-y-2 ${AUGMENT_TIER_STYLE[aug.tier]}`} onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-2">
                <Icon className="w-6 h-6" />
                <h3 className="text-sm font-extrabold">{aug.name}</h3>
              </div>
              <div className="text-[10px] font-mono opacity-80">{aug.tier} / {aug.category}</div>
              <p className="text-xs leading-relaxed text-slate-200">{aug.description}</p>
              <div className="text-right">
                <button onClick={() => setAugmentInfoId(null)} className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200">閉じる</button>
              </div>
            </div>
          </div>
        );
      })()}

      {showHelp && (
        <div className="fixed inset-0 bg-slate-950/85 z-50 flex items-center justify-center p-4" onClick={() => setShowHelp(false)}>
          <div className="bg-slate-900 border border-cyan-500/50 rounded-xl max-w-md w-full p-4 space-y-2 text-xs text-slate-300" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-1.5"><HelpCircle className="w-4 h-4" />操作ガイド</h3>
            <p>ショップからOCIサービスを雇用し、ベンチや盤面のユニットを<span className="text-cyan-300 font-semibold">「タップして選択 → 配置先をタップ」</span>で移動・入れ替えできます。</p>
            <p>同名3つで★2へ自動冗長化。稼働開始でクイズに答えると、正解ボーナスを得て戦闘へ進みます。</p>
            <div className="text-right"><button onClick={() => setShowHelp(false)} className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 font-bold">閉じる</button></div>
          </div>
        </div>
      )}
      {/* ==========================================
          モーダル1: OCI クイズフェーズ (正解で+3G ＆ 戦闘バフ+15%)
          ========================================== */}
      {phase === 'QUIZ' && currentQuiz && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-cyan-500/60 rounded-2xl max-w-2xl w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold px-2.5 py-1 rounded-full">
                  アーキテクチャ仕様確認フェーズ
                </span>
                <span className="text-xs text-slate-400">{getQuizCategory(currentQuiz)}</span>
                {(() => {
                  const d = getQuizDifficulty(currentQuiz.difficulty);
                  return (
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${d.style}`}>
                      {d.stars} {d.label}
                    </span>
                  );
                })()}
              </div>
              <span className="text-xs font-bold text-amber-300">正解報酬: 予算+{(currentQuiz.rewardGold ?? 3) * quizGoldMult}G ＆ 出力+{Math.round(quizBuffRate * 100)}%</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white leading-snug">{currentQuiz.question}</h3>

            <div className="space-y-2">
              {currentQuiz.choices.map((choiceText, idx) => {
                const isSelected = selectedChoice === idx;
                const isCorrect = idx === currentQuiz.correctIndex;

                let btnStyle = 'bg-slate-800/90 hover:bg-slate-800 border-slate-700 text-slate-200';
                if (quizAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/90 border-emerald-400 text-emerald-200 font-bold';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-950/90 border-rose-500 text-rose-200';
                  } else {
                    btnStyle = 'bg-slate-900 border-slate-800 text-slate-500';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectQuizChoice(idx)}
                    disabled={quizAnswered}
                    className={`w-full text-left p-3 rounded-xl border transition flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center text-xs font-mono shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm flex-1 leading-relaxed">{choiceText}</span>
                    {quizAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                    {quizAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {quizAnswered && (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center gap-2">
                  {selectedChoice === currentQuiz.correctIndex ? (
                    <span className="text-xs font-extrabold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      正解！ +{(currentQuiz.rewardGold ?? 3) * quizGoldMult}G 獲得 ＆ 味方全体の処理火力・シールド +{Math.round(quizBuffRate * 100)}% バフ発動！
                    </span>
                  ) : (
                    <span className="text-xs font-extrabold text-rose-400 flex items-center gap-1">
                      <XCircle className="w-4 h-4" />
                      不正解… 解説を確認して次ラウンドに活かしましょう！
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{currentQuiz.explanation}</p>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={startAutoBattle}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm flex items-center gap-1.5 shadow-lg"
                  >
                    <span>オートバトル開始！</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==========================================
          モーダル2: ラウンド結果＆利子精算モーダル
          ========================================== */}
      {phase === 'RESULT' && roundResult && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-slate-700 rounded-2xl max-w-md w-full p-5 shadow-2xl space-y-4">
            <div className="text-center">
              {roundResult.isVictory ? (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-bold mb-2">
                  <Award className="w-4 h-4" />
                  {roundLabel(round)} 防衛成功 (SLA 維持)
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/50 text-rose-300 text-xs font-bold mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  {roundLabel(round)} 負荷超過 (SLA -{roundResult.slaPenalty}%)
                </div>
              )}
              <h3 className="text-lg font-extrabold text-white">
                {roundResult.isVictory ? 'インシデントを完全に処理しました！' : '一部のリクエスト処理が遅延しました'}
              </h3>
            </div>

            {/* 予算・利子内訳（マネーウォーズ方式） */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2 text-xs">
              <div className="font-bold text-slate-300 border-b border-slate-800 pb-1.5">
                次フェーズ予算・利子精算
              </div>
              <div className="flex justify-between text-slate-300">
                <span>基本運用予算</span>
                <span className="font-mono font-bold text-emerald-300">+{roundResult.baseIncome} G</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>保有クレジット利子 (10Gごとに+1 / 最大+5)</span>
                <span className="font-mono font-bold text-amber-300">+{roundResult.interestIncome} G</span>
              </div>
              {roundResult.objStorageBonus > 0 && (
                <div className="flex justify-between text-cyan-300">
                  <span>Object Storage コスト最適化ボーナス</span>
                  <span className="font-mono font-bold">+{roundResult.objStorageBonus} G</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-extrabold text-white border-t border-slate-800 pt-2">
                <span>合計獲得クレジット</span>
                <span className="font-mono text-amber-300">+{roundResult.totalEarnedGold} G</span>
              </div>
            </div>

            {roundResult.mvpUnit && (
              <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-2.5 flex items-center justify-between text-xs">
                <span className="text-slate-300">最多トラフィック処理 MVP:</span>
                <span className="font-bold text-cyan-300">
                  {roundResult.mvpUnit.name} ({roundResult.mvpUnit.totalDamageDealt.toLocaleString()} dmg)
                </span>
              </div>
            )}

            <button
              onClick={handleProceedToNextRound}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm shadow-lg"
            >
              {round >= TOTAL_ROUNDS ? `${roundLabel(round)} に再挑戦する` : `${roundLabel(round + 1)} の準備へ進む`}
            </button>
          </div>
        </div>
      )}

      {/* ==========================================
          モーダル3: ゲームオーバー画面
          ========================================== */}
      {phase === 'VICTORY' && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-amber-400 rounded-2xl max-w-md w-full p-6 text-center space-y-4">
            <Award className="w-12 h-12 text-amber-300 mx-auto" />
            <h3 className="text-xl font-extrabold text-white">🎉 VICTORY — 全リージョン復旧完了！</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              【破滅的障害】グローバルリージョン全損クライシスを撃破し、全18ラウンドを走破しました。SLA稼働率 {slaHp}% でクラウド基盤を守り抜きました！
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
              クイズ正答実績: <strong className="text-cyan-300">{quizCorrectCount} / {quizTotalCount} 問</strong>
            </div>
            <button
              onClick={handleResetGame}
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm"
            >
              もう一度プレイする
            </button>
          </div>
        </div>
      )}

      {phase === 'GAMEOVER' && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-rose-500 rounded-2xl max-w-md w-full p-6 text-center space-y-4">
            <AlertTriangle className="w-12 h-12 text-rose-400 mx-auto" />
            <h3 className="text-xl font-extrabold text-white">システムダウン (SLA 0%)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {roundLabel(round)} の高負荷によりSLA稼働率が下限に達しました。前衛のWAF/LBと高可用性(Multi-AD)シナジーを意識して再構築してみましょう！
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
              今回のクイズ正答実績: <strong className="text-cyan-300">{quizCorrectCount} / {quizTotalCount} 問</strong>
            </div>
            <button
              onClick={handleResetGame}
              className="w-full py-3 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-extrabold text-sm"
            >
              新しいテナンシで再挑戦する
            </button>
          </div>
        </div>
      )}

      {/* ==========================================
          モーダル4: iPad実機確認・デプロイ手順 / データ構造 / OCI図鑑
          ========================================== */}
      {activeModal && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800">
              <h3 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                {activeModal === 'GUIDE' && '📱 iPad (第9世代) 実機確認・デプロイ手順ガイド'}
                {activeModal === 'JSON' && '💻 拡張用データ駆動マスター構造 (JSONインスペクタ)'}
                {activeModal === 'CATALOG' && '📘 収録OCIサービス一覧 (全15種・Cost 1〜3)'}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300"
              >
                閉じる
              </button>
            </div>

            <div className="p-5 overflow-y-auto text-xs space-y-4 leading-relaxed text-slate-300">
              {activeModal === 'GUIDE' && (
                <>
                  <div className="bg-cyan-950/40 border border-cyan-500/40 rounded-xl p-3.5 text-cyan-200">
                    <strong>まずはこの画面の右上の「Preview」上でそのまま全機能が遊べます！</strong>
                    <br />
                    さらにご自身のWindows PCからCloudflare Pages / GitHub Pages / OCI Object Storageへ配置して、iPad（第9世代）のSafariからホーム画面に追加する手順は以下の通りです。
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-white text-sm">1. Windows PCでVite + Reactプロジェクトを作成</h4>
                    <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-300 overflow-x-auto">
{`npm create vite@latest oci-cloud-wars -- --template react-ts
cd oci-cloud-wars
npm install lucide-react tailwindcss @tailwindcss/vite`}
                    </pre>
                    <p>
                      生成されたプロジェクトの <code className="text-amber-300">src/App.tsx</code> にこのエディタのコードを貼り付け、<code className="text-amber-300">npm run build</code> を実行すると静的ファイル一式（<code className="text-amber-300">dist</code> フォルダ）が出力されます。
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-white text-sm">
                      2. OCI Object Storage または Cloudflare Pages でホスティング（無料）
                    </h4>
                    <ul className="list-disc pl-5 space-y-1.5">
                      <li>
                        <strong>Cloudflare Pages（最短3分・推奨）:</strong> GitHubリポジトリを連携するか、<code className="text-amber-300">npx wrangler pages deploy dist</code> を実行するだけで <code className="text-cyan-300">https://xxx.pages.dev</code> のURLが即時発行されます。
                      </li>
                      <li>
                        <strong>OCI Object Storage で直接公開（OCIの実践学習にも最適！）:</strong> OCIコンソールでバケットを作成し、静的ファイル（index.html等）をアップロードして「事前認証済みリクエスト(PAR)」または前段に「API Gateway / Flexible LB」を構成すると、実際にOCIを触りながら自分のゲームを公開できます。
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-white text-sm">3. iPad（第9世代）で全画面アプリ化（PWA）</h4>
                    <p>
                      iPadのSafariで発行されたURLを開き、画面上部の共有アイコンから
                      <strong className="text-amber-300">「ホーム画面に追加」</strong>
                      をタップすると、アドレスバーが消えてネイティブゲームアプリと同じ感覚でプレイできます。
                    </p>
                  </div>
                </>
              )}

              {activeModal === 'JSON' && (
                <>
                  <p>
                    将来の「AWS編」「ネットワーク（CCNA）編」「Linux編」への拡張やマネタイズを見据え、ゲームロジックとユニット・クイズ定義は完全に分離されています。以下の配列にオブジェクトを追加するだけで新パックを増設できます。
                  </p>
                  <pre className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-[11px] text-cyan-300 overflow-x-auto max-h-96">
                    {JSON.stringify({ synergies: SYNERGY_MASTERS, sampleUnits: UNIT_MASTERS.slice(0, 4) }, null, 2)}
                  </pre>
                </>
              )}

              {activeModal === 'CATALOG' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {UNIT_MASTERS.map((u) => (
                    <div key={u.id} className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs">{u.name}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getCostBadgeStyle(u.cost)}`}>
                          Cost {u.cost} / {u.position === 'FRONT' ? '前衛' : '後衛'}
                        </span>
                      </div>
                      <div className="text-[11px] text-cyan-300 font-semibold">スキル: {u.skill.name}</div>
                      <p className="text-[11px] text-slate-400">{u.ociNote}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
