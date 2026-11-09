export const OCI_PRACTICE_QUIZZES = [
  {
    id: "q_net_001",
    domain: "OCI",
    relatedUnitId: "oci_vcn",
    difficulty: 1,
    question: "プライベートサブネット内のインスタンスから、インターネット上のOSリポジトリへパッチ更新のためにアウトバウンド通信のみを許可したい。VCNに配置すべきゲートウェイはどれか？",
    choices: [
      "インターネット・ゲートウェイ (IGW)",
      "NATゲートウェイ (NAT GW)",
      "サービス・ゲートウェイ (SGW)",
      "動的ルーティング・ゲートウェイ (DRG)"
    ],
    correctIndex: 1,
    explanation: "NATゲートウェイはプライベートサブネット内のリソースからインターネットへの一方向（アウトバウンド）通信を可能にし、外部からのインバウンド接続は遮断します。",
    rewardGold: 3
  },
  {
    id: "q_net_002",
    domain: "OCI",
    relatedUnitId: "oci_vcn",
    difficulty: 2,
    question: "プライベートサブネットからインターネットを経由せず、Oracleの内部ネットワークを通ってObject StorageやAutonomous DBに直接セキュアにアクセスするために必要なゲートウェイはどれか？",
    choices: [
      "サービス・ゲートウェイ (SGW)",
      "ローカル・ピアリング・ゲートウェイ (LPG)",
      "NATゲートウェイ (NAT GW)",
      "ストレージ・ゲートウェイ (Storage GW)"
    ],
    correctIndex: 0,
    explanation: "サービス・ゲートウェイ（Service Gateway）を利用することで、インターネット網を経由せずにVCN内からOracleサービスネットワーク（Object Storage等）へプライベートに接続できます。",
    rewardGold: 3
  },
  {
    id: "q_net_003",
    domain: "OCI",
    relatedUnitId: "oci_vcn",
    difficulty: 2,
    question: "OCIのネットワークセキュリティにおいて、サブネット単位ではなく「特定のコンピュートインスタンスのVNIC単位」できめ細かくパケットフィルタリングを適用できる機能はどれか？",
    choices: [
      "セキュリティ・リスト (Security List)",
      "ネットワーク・セキュリティ・グループ (NSG)",
      "ルート・表 (Route Table)",
      "Web Application Firewall (WAF)"
    ],
    correctIndex: 1,
    explanation: "セキュリティ・リストがサブネット全体に適用されるのに対し、NSG（Network Security Group）は特定のVNIC（仮想NIC）を指定してルールを適用できるため、同一サブネット内で異なるセキュリティ制御が可能です。",
    rewardGold: 3
  },
  {
    id: "q_net_004",
    domain: "OCI",
    relatedUnitId: "oci_fastconnect",
    difficulty: 2,
    question: "オンプレミスのデータセンターとOCI VCN間を、IPsec VPNではなく専用線を用いて広帯域・低遅延・高信頼でプライベート接続するサービスはどれか？",
    choices: [
      "Internet Gateway",
      "FastConnect",
      "Local Peering Gateway",
      "Dynamic Routing Gateway"
    ],
    correctIndex: 1,
    explanation: "FastConnectはオンプレミス環境とOCIを専用線（パートナー網または直接接続）で結び、インターネットを介さない一貫した帯域と低レイテンシを提供します。",
    rewardGold: 4
  },
  {
    id: "q_net_005",
    domain: "OCI",
    relatedUnitId: "oci_lb",
    difficulty: 2,
    question: "OCIのFlexible Load Balancer（フレキシブル・ロードバランサ）の帯域幅（Bandwidth）仕様に関する正しい記述はどれか？",
    choices: [
      "100Mbps、400Mbps、8Gbpsなどの固定シェイプのみ選択可能",
      "最小帯域幅と最大帯域幅（10Mbps〜8000Mbps）を数値で柔軟に指定可能",
      "帯域幅は自動決定され、ユーザーは変更できない",
      "ロードバランサの帯域幅変更にはインスタンスの再起動が必要"
    ],
    correctIndex: 1,
    explanation: "Flexible Load Balancerは固定シェイプではなく、最小10Mbpsから最大8000Mbpsの範囲で最小・最大帯域を柔軟（Flexible）に設定でき、ダウンタイムなしで動的に変更可能です。",
    rewardGold: 3
  },
  {
    id: "q_cmp_001",
    domain: "OCI",
    relatedUnitId: "oci_compute",
    difficulty: 1,
    question: "単一の可用性ドメイン（AD: Availability Domain）内において、電源やハードウェアラックの物理的な障害からインスタンスを保護・分散配置する仕組みはどれか？",
    choices: [
      "リージョン (Region)",
      "フォルト・ドメイン (Fault Domain: FD)",
      "コンパートメント (Compartment)",
      "インスタンス・プール (Instance Pool)"
    ],
    correctIndex: 1,
    explanation: "各アベイラビリティ・ドメインには3つのフォルト・ドメイン（FD1〜FD3）が含まれており、異なるFDにリソースを配置することで物理ハードウェア障害の影響を局所化・冗長化できます。",
    rewardGold: 3
  },
  {
    id: "q_cmp_002",
    domain: "OCI",
    relatedUnitId: "oci_compute",
    difficulty: 2,
    question: "OCIの「フレキシブル・コンピュート・シェイプ（例: VM.Standard.E4.Flex）」の特長として正しいものはどれか？",
    choices: [
      "CPU（OCPU）とメモリ（GB）の比率が1:4で完全固定されている",
      "OCPU数とメモリ容量を要件に応じて独立して1GB/1OCPU単位でカスタマイズできる",
      "ストレージ容量に応じてCPU数が自動的にプロビジョニングされる",
      "稼働中に自動でGPUが追加割り当てされる"
    ],
    correctIndex: 1,
    explanation: "フレキシブル・シェイプでは、ワークロードの必要量に合わせてOCPU数とメモリ容量（1OCPUあたり最大64GBまで等）を独立して自由にサイジングでき、無駄なリソースコストを削減できます。",
    rewardGold: 3
  },
  {
    id: "q_cmp_003",
    domain: "OCI",
    relatedUnitId: "oci_compute",
    difficulty: 2,
    question: "負荷に応じてコンピュートインスタンスの台数を自動的に増減（オートスケーリング）させるために、インスタンス・プールと組み合わせて設定するコンポーネントはどれか？",
    choices: [
      "自動スケーリング構成 (Autoscaling Configuration)",
      "クラスタ・ネットワーク (Cluster Network)",
      "Capacity Reservation",
      "Cloud Guard"
    ],
    correctIndex: 0,
    explanation: "インスタンス・プールに対して自動スケーリング構成（Autoscaling Configuration）を作成し、CPU使用率などのメトリックまたはスケジュールに基づいてインスタンス数を自動スケールアウト/スケールインさせます。",
    rewardGold: 3
  },
  {
    id: "q_cmp_004",
    domain: "OCI",
    relatedUnitId: "oci_oke",
    difficulty: 3,
    question: "OCIのマネージドKubernetesサービスであるOKE（Oracle Container Engine for Kubernetes）において、ワーカーノードのOS管理やパッチ適用をOracle側に委ねるサーバーレス型のノード実行形態はどれか？",
    choices: [
      "マネージド・ノード (Managed Nodes)",
      "仮想ノード (Virtual Nodes)",
      "セルフホスト・ノード (Self-Hosted Nodes)",
      "ベアメタル・ノード (Bare Metal Nodes)"
    ],
    correctIndex: 1,
    explanation: "OKEのバーチャル・ノード（Virtual Nodes）を利用すると、基盤となるコンピュートインスタンスの管理・パッチ適用・アップグレードがOracleによって自動化され、Podの実行環境をサーバーレス感覚で運用できます。",
    rewardGold: 4
  },
  {
    id: "q_cmp_005",
    domain: "OCI",
    relatedUnitId: "oci_functions",
    difficulty: 2,
    question: "OCI Functionsのベースとなっている、オープンソースのコンテナネイティブなサーバーレス・プラットフォームはどれか？",
    choices: [
      "OpenFaaS",
      "Fn Project",
      "Knative",
      "Kubeless"
    ],
    correctIndex: 1,
    explanation: "OCI Functionsはオープンソースの「Fn Project」エンジンをベースに完全マネージド化されており、Dockerコンテナイメージとしてパッケージ化された関数コードを実行します。",
    rewardGold: 3
  },
  {
    id: "q_str_001",
    domain: "OCI",
    relatedUnitId: "oci_object_storage",
    difficulty: 1,
    question: "OCI Object Storageのストレージ層（Storage Tier）のうち、即時アクセスが必要で頻繁に読み書きされるデータを保管するデフォルトの階層はどれか？",
    choices: [
      "標準層 (Standard Tier)",
      "低頻度アクセス層 (Infrequent Access Tier)",
      "アーカイブ層 (Archive Tier)",
      "ディープ・アーカイブ層 (Deep Archive Tier)"
    ],
    correctIndex: 0,
    explanation: "標準（Standard）階層は高スループット・即時アクセスを必要とするホットデータ向けで、データの取得費用（Retrieval Fee）が発生しません。",
    rewardGold: 3
  },
  {
    id: "q_str_002",
    domain: "OCI",
    relatedUnitId: "oci_object_storage",
    difficulty: 2,
    question: "Object Storageのアーカイブ層（Archive Tier）に保管されているオブジェクトのデータを読み出す際、リストア（復元）に必要な待ち時間（TimeToFirstByte）はおよそどれくらいか？",
    choices: [
      "ミリ秒単位（即時）",
      "数分〜最長4時間以内",
      "24時間以上",
      "3営業日"
    ],
    correctIndex: 1,
    explanation: "アーカイブ層のオブジェクトはそのままでは読み出せず、リストア要求を発行してからデータが取得可能になるまでに数分〜最大4時間（通常は1時間以内）かかります。",
    rewardGold: 3
  },
  {
    id: "q_str_003",
    domain: "OCI",
    relatedUnitId: "oci_object_storage",
    difficulty: 2,
    question: "IAMユーザーのアカウントを持たない社外の第三者に対して、Object Storage内の特定オブジェクトへのダウンロード（またはアップロード）を期間限定で許可するためのセキュアな仕組みはどれか？",
    choices: [
      "事前認証済みリクエスト (PAR: Pre-Authenticated Requests)",
      "パブリック・バケット公開設定",
      "一時APIトークン発行",
      "セキュリティ・ゾーン (Security Zones)"
    ],
    correctIndex: 0,
    explanation: "事前認証済みリクエスト（PAR）を発行することで、IAM認証情報を渡すことなく、有効期限や操作権限（読取/書込）を制限した専用のアクセスURLを第三者に提供できます。",
    rewardGold: 3
  },
  {
    id: "q_str_004",
    domain: "OCI",
    relatedUnitId: "oci_block_volume",
    difficulty: 2,
    question: "OCI Block Volumeのパフォーマンスを調整する「VPUs（Volume Performance Units）」に関する説明として正しいものはどれか？",
    choices: [
      "ボリューム作成時に固定され、後から変更するにはデータ移行が必要",
      "低コスト、バランス、高パフォーマンス、ウルトラハイパフォーマンスなどのティアを無停止で動的に変更可能",
      "VPUの変更はインスタンスを停止した状態でのみ実行可能",
      "VPUを上げてもIOPSとスループット上限は変化しない"
    ],
    correctIndex: 1,
    explanation: "OCI Block Volumeは、ボリュームをインスタンスにアタッチしたままオンライン・無停止でVPU/GBのパフォーマンス設定（最大120 VPU/GBのUltra High Performanceまで）をスライダーで変更できます。",
    rewardGold: 3
  },
  {
    id: "q_str_005",
    domain: "OCI",
    relatedUnitId: "oci_block_volume",
    difficulty: 3,
    question: "複数のBlock Volumeにまたがるクラッシュ整合性（Crash Consistency）を保ったバックアップを一括で取得・リストアするために使用する機能はどれか？",
    choices: [
      "ボリューム・グループ (Volume Group)",
      "ファイル・システム・エクスポート",
      "ブート・ボリューム・ミラー",
      "クローン・バケット"
    ],
    correctIndex: 0,
    explanation: "複数のブロック・ボリュームを「ボリューム・グループ」としてグループ化することで、データ整合性を担保した同一時点（Point-in-time）のグループバックアップやクローンを一度に実行できます。",
    rewardGold: 4
  },
  {
    id: "q_db_001",
    domain: "OCI",
    relatedUnitId: "oci_atp",
    difficulty: 1,
    question: "Autonomous Database（ATP / ADW）が自動（自律型）で実行してくれる運用タスクに含まれないものはどれか？",
    choices: [
      "OSおよびDBのセキュリティ・パッチの無停止適用",
      "クエリに応じた自動索引（Auto Indexing）の作成と最適化",
      "バックアップの自動取得と障害時の自動フェイルオーバー",
      "アプリケーション側のSQLクエリ構文の自動修正とデバッグ"
    ],
    correctIndex: 3,
    explanation: "Autonomous Databaseはプロビジョニング、チューニング、パッチ適用、バックアップ、修復などのインフラ・DBA運用を自律化しますが、アプリケーションのSQLコード自体の作成・デバッグはユーザーの責任範囲です。",
    rewardGold: 3
  },
  {
    id: "q_db_002",
    domain: "OCI",
    relatedUnitId: "oci_atp",
    difficulty: 2,
    question: "Autonomous Database（Sharedインフラストラクチャ）でCPUコア数やストレージ容量を変更（スケーリング）する際の特徴として正しいものはどれか？",
    choices: [
      "データベースの再起動（ダウンタイム）が発生する",
      "ダウンタイムなし（完全無停止）で即座にスケールアップ・スケールダウンが可能",
      "スケールアップは可能だが、スケールダウンはサポートされていない",
      "サイズ変更は週末のメンテナンスウィンドウでのみ反映される"
    ],
    correctIndex: 1,
    explanation: "Autonomous Databaseのコンピュート（ECPU/OCPU）およびストレージのスケーリングは、サービスを停止することなくオンラインで即座に実行できます（自動スケーリングもサポート）。",
    rewardGold: 3
  },
  {
    id: "q_db_003",
    domain: "OCI",
    relatedUnitId: "oci_atp",
    difficulty: 2,
    question: "Autonomous Databaseにおいて、トランザクション処理（OLTP）に特化し、行形式のストレージや高並行性トランザクション向けに最適化されたワークロードタイプはどれか？",
    choices: [
      "Autonomous Data Warehouse (ADW)",
      "Autonomous Transaction Processing (ATP)",
      "Autonomous JSON Database (AJD)",
      "Autonomous APEX Service"
    ],
    correctIndex: 1,
    explanation: "ATP（Autonomous Transaction Processing）はトランザクション処理、バッチ処理、レポーティングの混在ワークロード向けに設計されており、行ベースの格納と低レイテンシ応答に最適化されています。",
    rewardGold: 3
  },
  {
    id: "q_db_004",
    domain: "OCI",
    relatedUnitId: "oci_atp",
    difficulty: 3,
    question: "Autonomous Databaseで別リージョンへの災害復旧（DR）構成を組む際、遠隔地のスタンバイDBと同期・非同期レプリケーションを行う機能はどれか？",
    choices: [
      "Autonomous Data Guard",
      "GoldenGate Classic",
      "Storage Gateway Sync",
      "Cross-Region Volume Clone"
    ],
    correctIndex: 0,
    explanation: "Autonomous Data Guardを有効化することで、同一リージョン内（ローカル・スタンバイ）または別リージョン（クロスリージョン・スタンバイ）へ自動レプリケーションとフェイルオーバー環境を簡単に構築できます。",
    rewardGold: 4
  },
  {
    id: "q_sec_001",
    domain: "OCI",
    relatedUnitId: "oci_iam",
    difficulty: 1,
    question: "OCIのリソースを論理的に分離し、アクセス制御ポリシーの適用単位やコスト管理の単位として使用する階層構造の仕組みはどれか？",
    choices: [
      "テナンシ (Tenancy)",
      "コンパートメント (Compartment)",
      "セキュリティ・ゾーン (Security Zone)",
      "フォルト・ドメイン (Fault Domain)"
    ],
    correctIndex: 1,
    explanation: "コンパートメントはOCIリソースを論理的に整理・分離するための基本コンポーネントであり、最大6階層までのネスト（親子構造）とポリシーによる厳密なアクセス制御が可能です。",
    rewardGold: 3
  },
  {
    id: "q_sec_002",
    domain: "OCI",
    relatedUnitId: "oci_iam",
    difficulty: 2,
    question: "「コンピュートインスタンス自身」に対して、APIキーやパスワードをコードに埋め込むことなくOCIリソース（Object Storage等）へのアクセス権限を付与するためのIAM機能はどれか？",
    choices: [
      "ダイナミック・グループ (Dynamic Group)",
      "フェデレーション・ユーザー (Federated User)",
      "認証トークン (Auth Token)",
      "IAMアクセスポリシー・オーバーライド"
    ],
    correctIndex: 0,
    explanation: "ダイナミック・グループを使用すると、特定のコンパートメント内のインスタンスなどをメンバーとして定義し、そのグループに対してIAMポリシーを記述することで、認証情報をハードコードせずに権限を委任できます。",
    rewardGold: 3
  },
  {
    id: "q_sec_003",
    domain: "OCI",
    relatedUnitId: "oci_vault",
    difficulty: 2,
    question: "暗号化マスターキー（Master Encryption Keys）をFIPS 140-2準拠のハードウェア・セキュリティ・モジュール（HSM）で一元管理・保護するサービスはどれか？",
    choices: [
      "OCI IAM",
      "OCI Vault (Key Management Service)",
      "Cloud Guard",
      "Security Advisor"
    ],
    correctIndex: 1,
    explanation: "OCI Vaultは、暗号化キー（顧客管理キー: CMK）や機密情報（パスワード、証明書等のシークレット）をセキュアなHSM上で一元的に作成・ローテーション・管理するサービスです。",
    rewardGold: 3
  },
  {
    id: "q_sec_004",
    domain: "OCI",
    relatedUnitId: "oci_cloud_guard",
    difficulty: 2,
    question: "OCI環境全体を継続的に監視し、「パブリック公開されたバケット」や「開け放たれたセキュリティリスト」などのセキュリティリスクを自動検知・是正（修復）するサービスはどれか？",
    choices: [
      "Audit サービス",
      "Cloud Guard",
      "Vulnerability Scanning Service",
      "OS Management Hub"
    ],
    correctIndex: 1,
    explanation: "Cloud Guardはディテクタ（Detector）によりテナンシ内の構成ミスや異常なアクティビティを常時監視し、レスポンダ（Responder）によって自動的にルール遮断や非公開化などの是正アクションを実行できます。",
    rewardGold: 3
  },
  {
    id: "q_sec_005",
    domain: "OCI",
    relatedUnitId: "oci_waf",
    difficulty: 2,
    question: "クロスサイトスクリプティング（XSS）やSQLインジェクション、不正なWebボットなどのレイヤー7（HTTP/HTTPS）の脅威からWebアプリケーションを保護するサービスはどれか？",
    choices: [
      "Security List",
      "Network Security Group (NSG)",
      "Web Application Firewall (WAF)",
      "Dynamic Routing Gateway (DRG)"
    ],
    correctIndex: 2,
    explanation: "OCI WAFはレイヤー7（アプリケーション層）の通信を詳細に検査し、OWASP Top 10の脆弱性を突く攻撃や悪意のあるボット、DDoSトラフィックをエッジやロードバランサ上で遮断します。",
    rewardGold: 3
  },
  {
    id: "q_sec_006",
    domain: "OCI",
    relatedUnitId: "oci_bastion",
    difficulty: 2,
    question: "パブリックIPを持たないプライベートサブネット内のインスタンスに対して、パブリック踏み台サーバーを常時稼働させることなく、期間限定のセキュアなSSH/RDPセッションを提供するマネージドサービスはどれか？",
    choices: [
      "OCI Bastion",
      "OCI FastConnect",
      "OCI Remote Access VPN",
      "OCI Service Gateway"
    ],
    correctIndex: 0,
    explanation: "OCI Bastionサービスは完全マネージドの踏み台機能で、常時稼働のVMホストを用意することなく、SSHキーと有効期限付きのセッションを発行してプライベートインスタンスへ安全にアクセスできます。",
    rewardGold: 3
  },

  // --- ストレージ＆ファイルシステム深掘り ---
  {
    id: "q_str_006",
    domain: "OCI",
    relatedUnitId: "oci_object_storage",
    difficulty: 2,
    question: "Object Storageにおいて、一定期間（例: 90日）経過したオブジェクトを自動的にアーカイブ層へ移動させたり、1年後に自動削除する機能はどれか？",
    choices: [
      "オブジェクト・ライフサイクル管理 (Lifecycle Management)",
      "データ・リテンション・ルール",
      "ストレージ・ティア・ポリシー",
      "クロスリージョン・レプリケーション"
    ],
    correctIndex: 0,
    explanation: "オブジェクト・ライフサイクル管理ルールを設定することで、オブジェクトの経過日数やプレフィックスに応じて自動的に標準層からアーカイブ層へ移行したり、削除してコストを最適化できます。",
    rewardGold: 3
  },
  {
    id: "q_str_007",
    domain: "OCI",
    relatedUnitId: "oci_object_storage",
    difficulty: 3,
    question: "コンプライアンスや規制対応のため、Object Storage内のデータを指定した期間、管理者権限であっても上書きや削除を一切禁止（WORM機能）にするルールはどれか？",
    choices: [
      "保持ルール (Retention Rules)",
      "オブジェクト・バージョン無効化",
      "Vault CMK ロック",
      "セキュリティ・ゾーン排他ポリシー"
    ],
    correctIndex: 0,
    explanation: "バケットに保持ルール（Retention Rules）を設定すると、Write Once, Read Many（WORM）状態となり、指定期間中はrootユーザーや管理者であってもデータを削除・変更できなくなります。",
    rewardGold: 4
  },
  {
    id: "q_str_008",
    domain: "OCI",
    relatedUnitId: "oci_block_volume",
    difficulty: 2,
    question: "同一アベイラビリティ・ドメイン内の複数のコンピュートインスタンスから、共有ディスクとして同時にアタッチしてクラスタファイルシステムを構築できるBlock Volumeの機能はどれか？",
    choices: [
      "共有ブロック・ボリューム (Multi-Attach / Shareable Volume)",
      "ダイナミック・ボリューム・アタッチ",
      "ボリューム・ミラーリング",
      "FSS マウントターゲット"
    ],
    correctIndex: 0,
    explanation: "Block Volumeの「共有可能（Shareable）」を有効化（マルチアタッチ）することで、Oracle RACなどのクラスタ構成において複数インスタンスから同一ボリュームへの同時読み書きが可能になります。",
    rewardGold: 3
  },
  {
    id: "q_str_009",
    domain: "OCI",
    relatedUnitId: "oci_block_volume",
    difficulty: 2,
    question: "OCI File Storage (FSS) をVCN内のプライベートサブネットからマウントする際に、クライアントインスタンスとの通信エンドポイント（NFSサーバー口）となるコンポーネントはどれか？",
    choices: [
      "マウント・ターゲット (Mount Target)",
      "サービス・ゲートウェイ",
      "FSS プロキシ・ゲートウェイ",
      "ストレージ・コネクタ"
    ],
    correctIndex: 0,
    explanation: "FSSではサブネット内に「マウント・ターゲット」を作成し、そこにプライベートIPアドレスが割り当てられ、NFS v3プロトコルで通信を行います。",
    rewardGold: 3
  },
  {
    id: "q_str_010",
    domain: "OCI",
    relatedUnitId: "oci_block_volume",
    difficulty: 2,
    question: "ブロック・ボリュームの定期バックアップを自動化するために、Bronze、Silver、Goldなどの事前定義またはカスタムポリシーを関連付ける機能はどれか？",
    choices: [
      "バックアップ・ポリシー (Backup Policy)",
      "オートスケール・スケジュール",
      "ライフサイクル・エクスポート",
      "ボリューム・スナップショット・タスク"
    ],
    correctIndex: 0,
    explanation: "OCIはBronze/Silver/Goldといった事前定義バックアップ・ポリシー（日次、週次、月次自動取得）を提供しており、これらをボリュームに割り当てるだけで自動バックアップが実行されます。",
    rewardGold: 3
  },

  // --- コンピュート＆高可用性深掘り ---
  {
    id: "q_cmp_006",
    domain: "OCI",
    relatedUnitId: "oci_compute",
    difficulty: 2,
    question: "OCIの余剰コンピュートキャパシティを通常より最大50%安価に利用できるが、OCI側でリソースが必要になった際に2分前の通知で強制回収（終了）されるインスタンスタイプはどれか？",
    choices: [
      "プリエンプティブル・インスタンス (Preemptible Instances)",
      "バースト可能インスタンス (Burstable Instances)",
      "予約済みインスタンス (Reserved Instances)",
      "専用仮想マシン・ホスト (Dedicated VM Host)"
    ],
    correctIndex: 0,
    explanation: "プリエンプティブル・インスタンスは、中断が許容されるバッチ処理や分散処理向けに、余剰リソースを大幅な割引価格で利用できる仕組みです。",
    rewardGold: 3
  },
  {
    id: "q_cmp_007",
    domain: "OCI",
    relatedUnitId: "oci_compute",
    difficulty: 2,
    question: "普段はベースライン（例: 12.5%や50%）のCPU使用率で稼働し、アクセス集中時などのスパイク時にのみCPU性能を100%までバーストさせて利用するコスト効率の良いシェイプはどれか？",
    choices: [
      "バースト可能インスタンス (Burstable Instances)",
      "プリエンプティブル・インスタンス",
      "マイクロ・シェイプ",
      "クラスタ・コンピュート"
    ],
    correctIndex: 0,
    explanation: "バースト可能インスタンスは、常時高負荷ではないWebサーバー等のためにCPUベースラインを設定し、突発的な高負荷時のみフル性能を発揮させる低コストシェイプです。",
    rewardGold: 3
  },
  {
    id: "q_cmp_008",
    domain: "OCI",
    relatedUnitId: "oci_compute",
    difficulty: 2,
    question: "将来の災害復旧（DR）時や特定の日時において、必要なリージョンやADで確実にコンピュートリソースを起動できるよう、あらかじめキャパシティを確保・予約しておく機能はどれか？",
    choices: [
      "容量予約 (Capacity Reservation)",
      "インスタンス・クォータ",
      "プレースメント・グループ",
      "リザーブド・シェイプ"
    ],
    correctIndex: 0,
    explanation: "キャパシティ予約（Capacity Reservation）を行うと、インスタンスを起動していない待機状態でも特定シェイプのリソース枠が確実に確保されます。",
    rewardGold: 3
  },
  {
    id: "q_cmp_009",
    domain: "OCI",
    relatedUnitId: "oci_compute",
    difficulty: 2,
    question: "OCI基盤の物理ホストで計画メンテナンスが実施される際、VMインスタンスを停止することなく別の健全な物理ホストへダウンタイムなしで移動させる機能はどれか？",
    choices: [
      "ライブ・マイグレーション (Live Migration)",
      "フォルト・フェイルオーバー",
      "インスタンス・リブート・マイグレーション",
      "ホット・スワッピング"
    ],
    correctIndex: 0,
    explanation: "標準的なVMインスタンスでは、基盤ホストのメンテナンス時にライブ・マイグレーションが自動実行され、OSやアプリケーションを停止させることなく別ホストへ移行します。",
    rewardGold: 3
  },
  {
    id: "q_cmp_010",
    domain: "OCI",
    relatedUnitId: "oci_compute",
    difficulty: 3,
    question: "コンピュートインスタンスの起動時に、ユーザーデータ（cloud-initスクリプト等）を渡してパッケージの自動インストールや初期設定を実行する機能はどれか？",
    choices: [
      "カスタム・メタデータ (User Data / cloud-init)",
      "インスタンス・構成 (Instance Configuration)",
      "OS Hub テンプレート",
      "ブート・ボリューム・スクリプト"
    ],
    correctIndex: 0,
    explanation: "インスタンス作成時に「ユーザー・データ（User Data）」としてシェルスクリプトやcloud-init指示を渡すことで、初回起動時に自動でミドルウェア設定やアプリ起動を行えます。",
    rewardGold: 4
  },

  // --- ネットワーク＆ハイブリッド接続深掘り ---
  {
    id: "q_net_006",
    domain: "OCI",
    relatedUnitId: "oci_vcn",
    difficulty: 2,
    question: "複数のVCN間、オンプレミス環境（IPsec VPN / FastConnect）、別リージョンのDRG間をハブ＆スポーク形式で相互接続できる高機能仮想ルーターはどれか？",
    choices: [
      "動的ルーティング・ゲートウェイ (DRG v2)",
      "ローカル・ピアリング・ゲートウェイ (LPG)",
      "サービス・ゲートウェイ (SGW)",
      "プライベート・アクセス・ゲートウェイ"
    ],
    correctIndex: 0,
    explanation: "進化したDRG（DRG v2）は、VCNアタッチメントやIPsec/FastConnectアタッチメントを収容し、高度なルーティングテーブルによって推移的ルーティング（Transit Routing）やハブ＆スポーク網を実現します。",
    rewardGold: 3
  },
  {
    id: "q_net_007",
    domain: "OCI",
    relatedUnitId: "oci_vcn",
    difficulty: 2,
    question: "同一リージョン内の2つのVCNを、DRGを使わずにプライベート接続するための専用ゲートウェイはどれか？",
    choices: [
      "ローカル・ピアリング・ゲートウェイ (LPG)",
      "リモート・ピアリング・ゲートウェイ (RPG)",
      "NATゲートウェイ",
      "インターネット・ゲートウェイ"
    ],
    correctIndex: 0,
    explanation: "LPG（Local Peering Gateway）は、同一リージョン内の2つのVCN間でCIDRが重複していない場合に、低コストでピアリング接続を提供するコンポーネントです。",
    rewardGold: 3
  },
  {
    id: "q_net_008",
    domain: "OCI",
    relatedUnitId: "oci_lb",
    difficulty: 2,
    question: "OCI Flexible Load Balancerにおいて、クライアントの同一セッションからのリクエストを常に同じバックエンドサーバーへ転送し続けるための機能はどれか？",
    choices: [
      "セッション維持性 (Session Persistence / Sticky Session)",
      "接続ドレイン (Connection Draining)",
      "SSLトンネリング",
      "パス・ルート・マッピング"
    ],
    correctIndex: 0,
    explanation: "セッション・パーシステンス（Cookieベースのセッション維持）を有効にすることで、同一ブラウザからのリクエストが同一のバックエンドVMへ継続してルーティングされます。",
    rewardGold: 3
  },
  {
    id: "q_net_009",
    domain: "OCI",
    relatedUnitId: "oci_lb",
    difficulty: 2,
    question: "メンテナンス時にバックエンドサーバーを安全に切り離すため、既存の接続処理が完了するまで待機し、新規接続のみを停止する設定はどれか？",
    choices: [
      "接続ドレイン (Connection Draining)",
      "ヘルス・チェック・フェイル",
      "セッション・ドロップ",
      "グレースフル・シャットダウン・ゲート"
    ],
    correctIndex: 0,
    explanation: "接続ドレイン（Connection Draining）を有効にすると、指定したタイムアウト時間まで処理中の通信を継続させ、新規トラフィックのみを遮断して安全にサーバーを切り離せます。",
    rewardGold: 3
  },
  {
    id: "q_net_010",
    domain: "OCI",
    relatedUnitId: "oci_fastconnect",
    difficulty: 3,
    question: "FastConnectで高いSLAを要求される本番ワークロードにおいて、冗長性を確保するための推奨アーキテクチャはどれか？",
    choices: [
      "異なるプロバイダPOPまたは独立したルーター経由で2本以上の仮想回線（VC）を構成する",
      "単一の仮想回線で帯域幅を2倍に増強する",
      "DRGを2つ作成して同一ポートに接続する",
      "Internet Gatewayをバックアップとして常時開放する"
    ],
    correctIndex: 0,
    explanation: "OCIのSLA（99.9%または99.99%）を満たすためには、物理的に独立したパス（異なるFastConnectロケーションやルーター）から冗長な仮想回線を結ぶことが公式に推奨されています。",
    rewardGold: 4
  },

  // --- データベース＆Exadata深掘り ---
  {
    id: "q_db_005",
    domain: "OCI",
    relatedUnitId: "oci_atp",
    difficulty: 2,
    question: "Autonomous Databaseで業務負荷が急増した際、設定された基本ECPU数の最大何倍まで自動でコンピュートを動的拡張できるか？",
    choices: [
      "最大3倍まで",
      "最大1.5倍まで",
      "最大10倍まで",
      "上限なし"
    ],
    correctIndex: 0,
    explanation: "Autonomous Databaseの自動スケーリング（Auto Scaling）を有効にすると、ワークロードの要求に応じて即座に基本割り当ての最大3倍までCPU/メモリが自動拡張されます。",
    rewardGold: 3
  },
  {
    id: "q_db_006",
    domain: "OCI",
    relatedUnitId: "oci_atp",
    difficulty: 2,
    question: "Autonomous Databaseの自動バックアップの保持期間（Retention Period）として設定可能な標準範囲はどれか？",
    choices: [
      "1日〜60日間",
      "最大7日間のみ",
      "最大1年間",
      "無制限（削除不可）"
    ],
    correctIndex: 0,
    explanation: "Autonomous Databaseの自動バックアップ保持期間は、最小1日から最大60日までの範囲で要件に合わせて日単位で指定できます。",
    rewardGold: 3
  },
  {
    id: "q_db_007",
    domain: "OCI",
    relatedUnitId: "oci_atp",
    difficulty: 3,
    question: "Oracle Exadata Database Serviceが提供する、SQL処理の一部をストレージ・サーバー側にオフロード（プッシュダウン）してネットワーク転送量を激減させる独自技術はどれか？",
    choices: [
      "Smart Scan (スマート・スキャン)",
      "In-Memory Dual Format",
      "Direct Path Cache",
      "Storage Deduplication"
    ],
    correctIndex: 0,
    explanation: "ExadataのSmart Scan（Cell Offload）は、WHERE句のフィルタリングや列投影をストレージ層で直接実行し、DBサーバーへ必要な結果行のみを転送することで圧倒的な高速性を実現します。",
    rewardGold: 4
  },
  {
    id: "q_db_008",
    domain: "OCI",
    relatedUnitId: "oci_atp",
    difficulty: 2,
    question: "オンプレミスのOracle DBからOCI上のAutonomous DBやBase Databaseへの無停止・リアルタイムデータ移行や双方向同期に適したサービスはどれか？",
    choices: [
      "OCI GoldenGate",
      "Data Pump Direct",
      "Database Backup Cloud Service",
      "Zero Data Loss Recovery Appliance"
    ],
    correctIndex: 0,
    explanation: "OCI GoldenGateは完全マネージドなリアルタイム・データ統合・レプリケーションサービスで、最小限のダウンタイムでのDB移行や異機種間レプリケーションを提供します。",
    rewardGold: 3
  },

  // --- セキュリティ・ガバナンス＆コスト深掘り ---
  {
    id: "q_sec_007",
    domain: "OCI",
    relatedUnitId: "oci_iam",
    difficulty: 2,
    question: "コンパートメント内のリソース消費量（例: コンピュートのOCPU総数やBlock Volume容量）に対して上限値を設定し、予期せぬ使いすぎを防ぐ仕組みはどれか？",
    choices: [
      "コンパートメント・クォータ (Compartment Quotas)",
      "サービス制限 (Service Limits)",
      "予算アラート (Budgets)",
      "リソース・タグ・ルール"
    ],
    correctIndex: 0,
    explanation: "コンパートメント・クォータ（Quotas）ポリシーを記述することで、特定の子コンパートメントに対して利用可能なリソースの最大数や容量の上限を強制できます。",
    rewardGold: 3
  },
  {
    id: "q_sec_008",
    domain: "OCI",
    relatedUnitId: "oci_iam",
    difficulty: 2,
    question: "「プロジェクト名」や「環境（本番/開発）」などのメタデータをリソースに付与し、コスト配分レポートやアクセス制御に利用できる機能はどれか？",
    choices: [
      "定義済みタグ (Defined Tags)",
      "フリーフォーム・タグ (Free-form Tags)",
      "コンパートメント・ラベル",
      "IAM メタ属性"
    ],
    correctIndex: 0,
    explanation: "定義済みタグ（Defined Tags）はタグ・ネームスペース内でスキーマ（キーと許可される値）を定義でき、入力ミスを防ぎつつ厳密なコスト追跡やIAMポリシー制御に利用できます。",
    rewardGold: 3
  },
  {
    id: "q_sec_009",
    domain: "OCI",
    relatedUnitId: "oci_iam",
    difficulty: 3,
    question: "パブリックIPの付与禁止やバケットの暗号化強制など、セキュリティのベストプラクティスに反する操作を「APIリクエストの段階で強制的に拒絶・防止」する厳格なゾーンはどれか？",
    choices: [
      "セキュリティ・ゾーン (Security Zones)",
      "Cloud Guard レスポンダ",
      "WAF エッジ・ゾーン",
      "Vault セキュア・コンパートメント"
    ],
    correctIndex: 0,
    explanation: "セキュリティ・ゾーン（Security Zones）に関連付けられたコンパートメントでは、OCIが定義した厳格なセキュリティ・レシピが強制され、脆弱性のある構成変更は実行自体がエラーとなり遮断されます。",
    rewardGold: 4
  },
  {
    id: "q_sec_010",
    domain: "OCI",
    relatedUnitId: "oci_vault",
    difficulty: 2,
    question: "OCI Vaultで管理するマスター暗号化キー（CMK）をセキュリティ規約に従って定期的に更新・世代交代させる操作を何と呼ぶか？",
    choices: [
      "キー・ローテーション (Key Rotation)",
      "キー・マイグレーション",
      "暗号化リフレッシュ",
      "HSM同期"
    ],
    correctIndex: 0,
    explanation: "キー・ローテーションを実行すると、新しいキーバージョンが生成されて今後の暗号化に使用され、過去のデータは旧バージョンキーで復号できる互換性が維持されます。",
    rewardGold: 3
  },
  {
    id: "q_sec_011",
    domain: "OCI",
    relatedUnitId: "oci_cloud_guard",
    difficulty: 2,
    question: "OCIテナンシ内で発生したすべてのAPI呼び出しログ（誰が、いつ、どのリソースを変更したか）を不変（改ざん不可）の監査証跡として自動記録・保管する標準機能はどれか？",
    choices: [
      "Audit (監査) サービス",
      "Logging Analytics",
      "Cloud Guard ディテクタ",
      "Events サービス"
    ],
    correctIndex: 0,
    explanation: "OCI Auditサービスは追加設定不要でデフォルトで全APIアクティビティを記録しており、改ざん不能な監査ログとして365日間保持されます。",
    rewardGold: 3
  },
  {
    id: "q_sec_012",
    domain: "OCI",
    relatedUnitId: "oci_bastion",
    difficulty: 2,
    question: "OCI Bastionセッションの最大有効期限（Time-To-Live）として設定可能な上限時間はどれか？",
    choices: [
      "最長3時間 (180分)",
      "最長24時間",
      "最長30分",
      "無制限"
    ],
    correctIndex: 0,
    explanation: "OCI Bastionのポート・フォワーディングやマネージドSSHセッションの有効期限は、セキュリティ上、最大180分（3時間）までに制限されています。",
    rewardGold: 3
  },

  // --- 運用監視・オブザーバビリティ (Monitoring & Logging) ---
  {
    id: "q_obs_001",
    domain: "OCI",
    relatedUnitId: "oci_cloud_guard",
    difficulty: 2,
    question: "OCIリソースのCPU使用率やネットワーク送受信量などのメトリックを監視し、しきい値を超えた際に通知をトリガーする機能はどれか？",
    choices: [
      "OCI Monitoring アラーム (Alarms)",
      "OCI Audit",
      "Cloud Guard レスポンダ",
      "Logging Analytics"
    ],
    correctIndex: 0,
    explanation: "OCI Monitoringサービスのアラーム（Alarms）機能を使用すると、メトリックが指定したしきい値（例: CPU使用率85%以上が5分継続）を超えた際にNotificationsサービス等へ通知を発行できます。",
    rewardGold: 3
  },
  {
    id: "q_obs_002",
    domain: "OCI",
    relatedUnitId: "oci_cloud_guard",
    difficulty: 2,
    question: "「バケットが作成された」「インスタンスの状態が変更された」などのリソース状態変化を検知し、FunctionsやNotificationsを自動起動するイベント駆動サービスはどれか？",
    choices: [
      "OCI Events サービス",
      "OCI Streaming",
      "OCI Service Connector Hub",
      "OCI Queue"
    ],
    correctIndex: 0,
    explanation: "OCI EventsサービスはCloudEvents標準に準拠しており、リソースの状態変化イベントをリアルタイムにフィルタリングしてFunctionsの実行やNotificationsへの通知を自動発火させます。",
    rewardGold: 3
  },
  {
    id: "q_obs_003",
    domain: "OCI",
    relatedUnitId: "oci_cloud_guard",
    difficulty: 2,
    question: "OCI Monitoringサービスにおいて、メトリックの集計やしきい値判定ルールを柔軟に記述するために使用される専用クエリ言語はどれか？",
    choices: [
      "MQL (Monitoring Query Language)",
      "PromQL",
      "SQL",
      "KQL (Kusto Query Language)"
    ],
    correctIndex: 0,
    explanation: "MQL（Monitoring Query Language）はOCI Monitoring独自のクエリ表現言語で、メトリックの統計処理、時間窓の集計、グループ化演算などを記述できます。",
    rewardGold: 3
  },
  {
    id: "q_obs_004",
    domain: "OCI",
    relatedUnitId: "oci_cloud_guard",
    difficulty: 2,
    question: "Logging、Monitoring、Streamingなどの異なるサービス間で、コードを書かずにサーバーレスでデータの連携・ルーティング・フィルタリングを行うサービスはどれか？",
    choices: [
      "Service Connector Hub (サービス・コネクタ・ハブ)",
      "API Gateway",
      "FastConnect",
      "Data Integration"
    ],
    correctIndex: 0,
    explanation: "Service Connector Hubは、ログやメトリック、ストリームなどのデータソースから、Object StorageやFunctions、外部SIEMなどの宛先へサーバーレスでデータパイプラインを構築するサービスです。",
    rewardGold: 3
  },
  {
    id: "q_obs_005",
    domain: "OCI",
    relatedUnitId: "oci_cloud_guard",
    difficulty: 3,
    question: "複数のOS、ミドルウェア、アプリケーションから収集した大量のログに対して、機械学習を用いて異常パターンの自動クラスタリングや傾向分析を行うサービスはどれか？",
    choices: [
      "Logging Analytics (ロギング・アナリティクス)",
      "OCI Audit",
      "Cloud Guard ディテクタ",
      "Database Management"
    ],
    correctIndex: 0,
    explanation: "OCI Logging Analyticsは、機械学習ベースの高度なログ解析サービスで、何百万行ものログから典型パターンをグループ化し、未知のエラーやセキュリティインシデントの予兆を可視化します。",
    rewardGold: 4
  },
  {
    id: "q_obs_006",
    domain: "OCI",
    relatedUnitId: "oci_compute",
    difficulty: 2,
    question: "OCIおよびオンプレミスに存在する多数のLinux/Windowsインスタンスに対して、OSのセキュリティパッチ適用やパッケージ更新を一元管理・自動化するサービスはどれか？",
    choices: [
      "OS Management Hub",
      "Instance Pool",
      "Container Engine",
      "Vulnerability Scanning Service"
    ],
    correctIndex: 0,
    explanation: "OS Management Hubは、フリート全体のインスタンスに対するCVE脆弱性スキャン、パッチ適用スケジュール、カスタムソフトウェアソースの配布を一元的に自律管理します。",
    rewardGold: 3
  },

  // --- 自動化・IaC・DevOps (Automation & DevOps) ---
  {
    id: "q_dev_001",
    domain: "OCI",
    relatedUnitId: "oci_compute",
    difficulty: 1,
    question: "HashiCorp Terraformをベースに、OCIのインフラ構築・変更・破棄をブラウザからマネージドに実行できるInfrastructure as Code (IaC) サービスはどれか？",
    choices: [
      "Resource Manager (リソース・マネージャ)",
      "OCI Cloud Shell",
      "OCI DevOps",
      "Application Performance Monitoring"
    ],
    correctIndex: 0,
    explanation: "OCI Resource ManagerはマネージドなTerraform実行環境であり、ステートファイルの自動ロック・暗号化保管、プラン実行、ドリフト検出などを追加インフラなしで提供します。",
    rewardGold: 3
  },
  {
    id: "q_dev_002",
    domain: "OCI",
    relatedUnitId: "oci_compute",
    difficulty: 2,
    question: "Resource Managerにおいて、既存の実行中インフラとTerraformステートファイルとの間に構成の乖離（手動変更など）がないかを検証する機能はどれか？",
    choices: [
      "ドリフト検出 (Drift Detection)",
      "プラン・バリデーション",
      "ロールバック・スキャン",
      "スキーマ・インスペクタ"
    ],
    correctIndex: 0,
    explanation: "ドリフト検出（Drift Detection）を実行すると、Terraform管理外でコンソール等から手動変更されたリソースの差分を検知・可視化できます。",
    rewardGold: 3
  },
  {
    id: "q_dev_003",
    domain: "OCI",
    relatedUnitId: "oci_oke",
    difficulty: 2,
    question: "DockerコンテナイメージやHelmチャートをプライベートまたはパブリックにセキュア保管・共有するためのマネージドレジストリサービスはどれか？",
    choices: [
      "OCI Container Registry (OCIR)",
      "Object Storage Direct Registry",
      "OKE Image Cache",
      "Artifact Hub"
    ],
    correctIndex: 0,
    explanation: "OCIR（Oracle Cloud Infrastructure Registry）はOCI完全統合のコンテナレジストリで、IAMポリシーによるきめ細かなアクセス制御や脆弱性スキャン機能を備えています。",
    rewardGold: 3
  },
  {
    id: "q_dev_004",
    domain: "OCI",
    relatedUnitId: "oci_compute",
    difficulty: 1,
    question: "OCIコンソールからワンクリックで起動でき、OCI CLI、Git、Terraform、Python、Kubectl等の主要開発ツールが事前構成された無料のブラウザ端末環境はどれか？",
    choices: [
      "Cloud Shell (クラウド・シェル)",
      "Bastion Console",
      "Cloud Web SSH",
      "DevOps Workbench"
    ],
    correctIndex: 0,
    explanation: "Cloud Shellはブラウザ内で直接動作するLinuxシェル環境で、月間5GBの永続ストレージと認証済みOCI CLIや主要ツール群がプリインストールされています。",
    rewardGold: 3
  },
  {
    id: "q_dev_005",
    domain: "OCI",
    relatedUnitId: "oci_oke",
    difficulty: 2,
    question: "コードのビルド、テスト、OKEやコンピュートへのデプロイパイプラインをエンドツーエンドで自動化するOCIのネイティブCI/CDサービスはどれか？",
    choices: [
      "OCI DevOps サービス",
      "Resource Manager",
      "OCI Events",
      "Code Pipeline Manager"
    ],
    correctIndex: 0,
    explanation: "OCI DevOpsサービスは、Gitリポジトリ、ビルドパイプライン、デプロイパイプライン（Blue/Green、Canaryデプロイ対応）を提供するネイティブなCI/CD基盤です。",
    rewardGold: 3
  },

  // --- データベース＆データ基盤詳細 (Database & Big Data) ---
  {
    id: "q_db_009",
    domain: "OCI",
    relatedUnitId: "oci_atp",
    difficulty: 2,
    question: "MySQL Database Serviceに組み込まれ、OLTPデータをETLなしでインメモリ並列処理し、大規模アナリティクス（OLAP）クエリを数百倍高速化するエンジンはどれか？",
    choices: [
      "HeatWave (ヒートウェーブ)",
      "Autonomous Accelerator",
      "Exadata Flash Cache",
      "Data Flow Cache"
    ],
    correctIndex: 0,
    explanation: "MySQL HeatWaveは、MySQL DBシステムに統合された超高速インメモリ分析エンジンで、分析専用DBへデータを転送・ETLすることなく単一のMySQL上でトランザクションと大規模分析を両立します。",
    rewardGold: 3
  },
  {
    id: "q_db_010",
    domain: "OCI",
    relatedUnitId: "oci_atp",
    difficulty: 2,
    question: "Oracle Database（クラウドおよびオンプレミス）の機密データ検知、データマスキング、ユーザー権限監査、セキュリティ評価を一元管理するセキュリティ機能はどれか？",
    choices: [
      "Oracle Data Safe (データ・セーフ)",
      "Cloud Guard DB",
      "Database Vault",
      "Audit Safe"
    ],
    correctIndex: 0,
    explanation: "Oracle Data SafeはOCIの基本機能として提供されており、機密データ（個人情報等）の探索、開発・検証用データマスキング、ユーザーリスクやDB構成のセキュリティ評価を一元提供します。",
    rewardGold: 3
  },
  {
    id: "q_db_011",
    domain: "OCI",
    relatedUnitId: "oci_functions",
    difficulty: 2,
    question: "Apache Sparkクラスタのインフラ管理やサイジングを一切行うことなく、ビッグデータ処理アプリケーションをサーバーレスで実行できるサービスはどれか？",
    choices: [
      "OCI Data Flow",
      "OCI Data Integration",
      "Big Data Service",
      "OKE Spark Pool"
    ],
    correctIndex: 0,
    explanation: "OCI Data Flowは完全マネージドのApache Sparkサービスであり、サーバーやクラスタのプロビジョニング不要で、Sparkジョブコードを投入するだけでスケールアウトして実行されます。",
    rewardGold: 3
  },
  {
    id: "q_db_012",
    domain: "OCI",
    relatedUnitId: "oci_functions",
    difficulty: 2,
    question: "Apache Kafkaと互換性のあるAPIを備え、IoTセンサーやクリックストリームなどの高頻度・大容量メッセージをリアルタイムに取り込むサーバーレスストリーミングサービスはどれか？",
    choices: [
      "OCI Streaming サービス",
      "OCI Queue",
      "OCI Service Gateway",
      "FastConnect Stream"
    ],
    correctIndex: 0,
    explanation: "OCI StreamingはKafka互換の完全マネージド・ストリーミング基盤で、メッセージの保持、パーティション分割、高スループットな分散ログ処理をサーバーレスで提供します。",
    rewardGold: 3
  },
  {
    id: "q_db_013",
    domain: "OCI",
    relatedUnitId: "oci_atp",
    difficulty: 3,
    question: "Oracle Database 23aiやAutonomous DBにおいて、テキストや画像などの非構造化データを数値ベクトル化し、LLMと連携した高速なセマンティック類似検索（RAG）を実現する技術はどれか？",
    choices: [
      "AI Vector Search (ベクトル検索)",
      "In-Memory Text Search",
      "JSON Relational Duality",
      "Spatial and Graph Vector"
    ],
    correctIndex: 0,
    explanation: "Oracle Database 23aiで導入されたAI Vector Searchは、ネイティブなVECTORデータ型とベクトル索引（HNSW等）をサポートし、ビジネスデータと非構造化データのセマンティック検索を単一SQLで高速実行します。",
    rewardGold: 4
  },
  {
    id: "q_db_014",
    domain: "OCI",
    relatedUnitId: "oci_functions",
    difficulty: 2,
    question: "OCI上でLlamaやCommandなどの最先端オープンモデル・基盤モデルをセキュアにホストし、プライベートデータを用いたファインチューニングやチャット生成を実行できるマネージドサービスはどれか？",
    choices: [
      "OCI Generative AI サービス",
      "OCI Data Science Sandbox",
      "OCI AI Studio",
      "OCI Cognitive Service"
    ],
    correctIndex: 0,
    explanation: "OCI Generative AIサービスは、専用AIクラスタ上で推論およびファインチューニングを安全に行える完全マネージドサービスで、顧客データがモデル学習に流出しないエンタープライズセキュリティを担保します。",
    rewardGold: 3
  },

  // --- 高度なセキュリティ＆ネットワーク (Advanced Security & Network) ---
  {
    id: "q_sec_013",
    domain: "OCI",
    relatedUnitId: "oci_waf",
    difficulty: 3,
    question: "Palo Alto Networksの次世代ファイアウォール技術を組み込み、ディープパケットインスペクション（DPI）、IDS/IPS、URLフィルタリングを提供するマネージドネットワークセキュリティサービスはどれか？",
    choices: [
      "OCI Network Firewall",
      "OCI WAF",
      "Security Lists Enterprise",
      "Cloud Guard Network Shield"
    ],
    correctIndex: 0,
    explanation: "OCI Network FirewallはPalo Alto Networksの機械学習ベースのNGFW技術を採用したネイティブなマネージドファイアウォールで、North-SouthおよびEast-Westトラフィックに対する高度なL4〜L7保護を提供します。",
    rewardGold: 4
  },
  {
    id: "q_sec_014",
    domain: "OCI",
    relatedUnitId: "oci_cloud_guard",
    difficulty: 2,
    question: "コンピュートインスタンスのOSパッケージの既知の脆弱性（CVE）や、開いているポートのセキュリティリスクを自動スキャンしてスコアリングするサービスはどれか？",
    choices: [
      "OCI Vulnerability Scanning Service (VSS)",
      "OCI Audit",
      "OS Management Hub",
      "Security Advisor"
    ],
    correctIndex: 0,
    explanation: "OCI Vulnerability Scanning Service（VSS）は、コンピュートホストやコンテナレジストリ（OCIR）のイメージに対して、CISベンチマークや既知のCVE脆弱性を定期スキャンして報告します。",
    rewardGold: 3
  },
  {
    id: "q_sec_015",
    domain: "OCI",
    relatedUnitId: "oci_vault",
    difficulty: 2,
    question: "Webサイトやロードバランサで使用するSSL/TLS証明書の発行、秘密鍵のセキュア保管、および有効期限切れ前の自動更新を管理するサービスはどれか？",
    choices: [
      "OCI Certificates (証明書サービス)",
      "OCI Vault KMS",
      "OCI IAM Security Token",
      "API Gateway Auth"
    ],
    correctIndex: 0,
    explanation: "OCI Certificatesは、パブリックおよびプライベートな認証局（CA）階層の構築やTLS/SSL証明書のライフサイクル管理・自動ローテーションを統合提供します。",
    rewardGold: 3
  },
  {
    id: "q_sec_016",
    domain: "OCI",
    relatedUnitId: "oci_iam",
    difficulty: 3,
    question: "自社のIdP（Identity Provider: 例 Azure AD/Entra ID や Okta）とOCI IAMをSAML 2.0やSCIMプロトコルで接続し、シングルサインオンとユーザー同期を実現する設定はどれか？",
    choices: [
      "IDフェデレーション / アイデンティティ・ドメイン (Identity Domains)",
      "ダイナミック・グループ・リンク",
      "テナンシ・ピアリング",
      "コンパートメント・シンク"
    ],
    correctIndex: 0,
    explanation: "OCI IAM（Identity Domains）はSAML 2.0やSCIMをサポートしており、外部IdPとフェデレーションを構成することで、既存の社内アカウントによるSSOとアカウント自動プロビジョニングが可能です。",
    rewardGold: 4
  },
  {
    id: "q_net_011",
    domain: "OCI",
    relatedUnitId: "oci_lb",
    difficulty: 2,
    question: "OCI DNSのTraffic Managementにおいて、ユーザーのアクセス元地域（クライアントの送信元IPの地理情報）に基づいて最適なリージョンへルーティングを振り分けるポリシーはどれか？",
    choices: [
      "ジオロケーション・ステアリング (Geolocation Steering)",
      "フェイルオーバー・ポリシー",
      "ロードバランシング・ステアリング",
      "IPプレフィックス・フィルタ"
    ],
    correctIndex: 0,
    explanation: "DNS Traffic Managementのジオロケーション・ステアリングを使用すると、アクセスしてきたユーザーの物理的な地域（国や大陸）に最も近いOCIリージョンへトラフィックを誘導できます。",
    rewardGold: 3
  },
  {
    id: "q_net_012",
    domain: "OCI",
    relatedUnitId: "oci_vcn",
    difficulty: 2,
    question: "VCN全体のトポロジーマップ（サブネット、ゲートウェイ、ルーティング経路、セキュリティリスト）をGUI上でグラフィカルに可視化し、接続性を視覚的に確認できるコンソール機能はどれか？",
    choices: [
      "Network Visualizer (ネットワーク・ビジュアライザ)",
      "Route Table Inspector",
      "VCN Flow Logs Viewer",
      "Network Security Group Map"
    ],
    correctIndex: 0,
    explanation: "Network Visualizerは、VCN内の複雑なネットワークリソースの相互関係とルーティング経路を図として動的にマッピング・可視化し、構成確認やトラブルシューティングを容易にします。",
    rewardGold: 3
  },

  // --- 高度なセキュリティ＆ネットワーク追加分 ---
  {
    id: "q_sec_017",
    domain: "OCI",
    relatedUnitId: "oci_iam",
    difficulty: 3,
    question: "IAMポリシーにおいて、「リクエスト元のIPアドレスが社内ネットワーク（特定のパブリックIP範囲）からの場合のみアクセスを許可する」という条件制御を行うために定義するコンポーネントはどれか？",
    choices: [
      "ネットワーク・ソース (Network Sources)",
      "IPセキュリティ・リスト",
      "Bastionアクセス・ポリシー",
      "コンパートメント・ファイアウォール"
    ],
    correctIndex: 0,
    explanation: "ネットワーク・ソース（Network Sources）を作成して許可IPアドレス範囲（CIDR）を定義し、IAMポリシーの条件節（where request.network.source = ...）で参照することで、接続元IPに基づく厳密な認可制御が可能です。",    rewardGold: 4
  },
  {
    id: "q_net_013",
    domain: "OCI",
    relatedUnitId: "oci_vcn",
    difficulty: 3,
    question: "複数のVCN間でトラフィックを中継（Transit Routing）する際、セキュリティアプライアンス（次世代ファイアウォールVM等）を経由させて全パケットのインスペクションを行うためのルーティング設計はどれか？",
    choices: [
      "DRGルート表を用いたハブ＆スポーク型トランジット・ルーティング",
      "LPGフルメッシュ直結構成",
      "サービス・ゲートウェイのリダイレクト設定",
      "インターネット・ゲートウェイのプロキシ転送"
    ],
    correctIndex: 0,
    explanation: "ハブVCN内にファイアウォール機器を配置し、DRG v2のルート表でスポークVCN間のトラフィックをハブのIPへ強制ルーティングすることで、集約された高度なパケットインスペクション環境を構築できます。",
    rewardGold: 4
  },

  // --- 組織ガバナンス・コスト管理・エンタープライズ設計 (Governance & FinOps) ---
  {
    id: "q_ent_001",
    domain: "OCI",
    relatedUnitId: "oci_iam",
    difficulty: 3,
    question: "企業グループ内の複数のテナンシを一元管理し、統合請求（Consolidated Billing）や親テナンシからのリソース共有を実現するOCIの機能はどれか？",
    choices: [
      "OCI Organizations (組織管理)",
      "Cross-Tenancy IAM Federation",
      "Enterprise Compartment Tree",
      "Tenancy Mesh"
    ],
    correctIndex: 0,
    explanation: "OCI Organizationsを使用すると、親テナンシ配下に複数の子テナンシを束ねて請求を一括管理し、テナンシ間でのクレジット共有や組織全体のリソース管理を一元化できます。",
    rewardGold: 4
  },
  {
    id: "q_ent_002",
    domain: "OCI",
    relatedUnitId: "oci_iam",
    difficulty: 3,
    question: "異なるテナンシ間（テナンシAとテナンシB）で、Object Storageやコンピュートリソースへのセキュアな相互アクセスを許可するために、両方のテナンシで定義する必要があるIAMステートメントの組み合わせはどれか？",
    choices: [
      "Define / Endorse / Admit",
      "Allow / Grant / Trust",
      "Authorize / Share / Accept",
      "Federate / Connect / Map"
    ],
    correctIndex: 0,
    explanation: "テナンシ間アクセス（Cross-Tenancy）では、ソース側でリクエストを推奨（Endorse）し、ターゲット側でアクセスを承認（Admit）し、それぞれのテナンシをエイリアス定義（Define）する3つのステートメントを組み合わせて設定します。",
    rewardGold: 4
  },
  {
    id: "q_ent_003",
    domain: "OCI",
    relatedUnitId: "oci_iam",
    difficulty: 2,
    question: "OCIのコスト管理において、月間の予算額を設定し、実際の利用額または月末の予測利用額が特定の割合（例: 80%や100%）に達した際に自動でEメール通知を発行する機能はどれか？",
    choices: [
      "OCI Budgets (予算)",
      "Cost Analysis Alert",
      "Usage Metering Trigger",
      "FinOps Guard"
    ],
    correctIndex: 0,
    explanation: "OCI Budgetsは、コンパートメントまたはコスト追跡タグに対して予算しきい値を設定でき、実績額だけでなく予測消費額に基づいたアラート通知もサポートしています。",
    rewardGold: 3
  },
  {
    id: "q_ent_004",
    domain: "OCI",
    relatedUnitId: "oci_iam",
    difficulty: 3,
    question: "リソースの作成時に、作成者のIAMユーザー名（例: ocid1.user...）や作成日時をタグとして自動的かつ強制的に付与する機能はどれか？",
    choices: [
      "タグのデフォルト (Tag Defaults)",
      "フリーフォーム・トラッカー",
      "監査ログタグ・インジェクター",
      "IAMポリシー・アトリビュート"
    ],
    correctIndex: 0,
    explanation: "コンパートメントに対して「タグのデフォルト（Tag Defaults）」を設定することで、リソース作成時に作成者IDやタイムスタンプを自動付与でき、野良リソースの発生を防止できます。",
    rewardGold: 4
  },

  // --- 高度な災害復旧＆ストレージレプリケーション (Advanced DR & Storage) ---
  {
    id: "q_dr_001",
    domain: "OCI",
    relatedUnitId: "oci_block_volume",
    difficulty: 3,
    question: "Block Volumeのクロスリージョン・非同期レプリケーション（Cross-Region Volume Replication）に関する説明として正しいものはどれか？",
    choices: [
      "リージョン間でブロックの変更差分が継続的に自動同期され、DRサイトへ素早くフェイルオーバーできる",
      "レプリケーションを実行するにはインスタンスを常時停止しておく必要がある",
      "同期レプリケーションのため、プライベート専用線（FastConnect）が必須である",
      "1つのボリュームに対して最大10個の宛先リージョンへ同時に複製できる"
    ],
    correctIndex: 0,
    explanation: "Block Volumeのクロスリージョン・レプリケーションは、別リージョンのブロックボリュームへ変更差分を非同期で継続転送し、災害発生時に即座にDRボリュームとして起動・アタッチできます。",
    rewardGold: 4
  },
  {
    id: "q_dr_002",
    domain: "OCI",
    relatedUnitId: "oci_object_storage",
    difficulty: 2,
    question: "Object Storageのクロスリージョン・レプリケーション（Cross-Region Replication）において、宛先（ターゲット）バケットの動作として正しいものはどれか？",
    choices: [
      "ソースバケットから複製されたデータは宛先バケットで読み取り専用（Read-Only）となる",
      "双方向で完全同期され、宛先側でも直接書き込み・更新が可能",
      "レプリケーションは日次バッチでのみ実行される",
      "宛先バケットは常にパブリックアクセスが強制される"
    ],
    correctIndex: 0,
    explanation: "Object Storageのクロスリージョン・レプリケーションは一方向の非同期複製であり、ターゲットバケット内のオブジェクトはデータ保護のため読み取り専用となります。",
    rewardGold: 3
  },
  {
    id: "q_dr_003",
    domain: "OCI",
    relatedUnitId: "oci_atp",
    difficulty: 3,
    question: "Autonomous Data Guardにおいて、プライマリDBで障害が発生した際にデータ損失ゼロ（RPO=0）で自動フェイルオーバーを成立させるための前提条件はどれか？",
    choices: [
      "同一リージョン内の別可用性ドメイン（ローカル・スタンバイ）構成であること",
      "クロスリージョン・スタンバイを非同期モードで構成すること",
      "Object Storageのアーカイブ層を経由してログ転送すること",
      "GoldenGateによる差分キャプチャが設定されていること"
    ],
    correctIndex: 0,
    explanation: "同一リージョン内のローカル・スタンバイ（別ADまたは同一AD別FD）では同期レプリケーションが使用されるため、データ損失なし（RPO=0）での自動フェイルオーバーが可能です（別リージョン間のクロスリージョンは非同期）。",
    rewardGold: 4
  },
  {
    id: "q_dr_004",
    domain: "OCI",
    relatedUnitId: "oci_compute",
    difficulty: 3,
    question: "OCI Full Stack Disaster Recovery (Full Stack DR) サービスが提供する主な機能はどれか？",
    choices: [
      "コンピュート、ストレージ、DB（Data Guard）、ネットワークのフェイルオーバー計画を一括オーケストレーション・自動実行する",
      "オンプレミスとOCI間でOSのイメージバックアップのみを取得する",
      "DDOS攻撃を検知した際にDNSのレコードを自動削除する",
      "クラスタ・ノードの死活監視とpingテストのみを行う"
    ],
    correctIndex: 0,
    explanation: "Full Stack DRは、VM、ブロックストレージ、Autonomous DB/Exadata、OKEなどシステム全体のDR切り替え手順をドラフトし、ワンクリックで移行・フェイルオーバーを包括的に自動実行するマネージドサービスです。",
    rewardGold: 4
  },

  // --- 高度なハイブリッド＆ネットワーク設計 (Advanced Hybrid & Networking) ---
  {
    id: "q_net_014",
    domain: "OCI",
    relatedUnitId: "oci_fastconnect",
    difficulty: 3,
    question: "オンプレミスとOCI間のIPsec VPN接続において、アクティブ/アクティブ構成による冗長化と等コストマルチパス（ECMP）ルーティングを実現するために必須のプロトコルはどれか？",
    choices: [
      "BGP (ボーダー・ゲートウェイ・プロトコル)",
      "OSPF",
      "RIP v2",
      "静的ルーティング (Static Routing)"
    ],
    correctIndex: 0,
    explanation: "OCIのIPsec VPNでトンネルの冗長化やECMP（トラフィック負荷分散）を行うには、動的ルーティングプロトコルであるBGPを設定し、各トンネル経由で同じ経路プレフィックスをアドバタイズする必要があります。",
    rewardGold: 4
  },
  {
    id: "q_net_015",
    domain: "OCI",
    relatedUnitId: "oci_fastconnect",
    difficulty: 3,
    question: "オンプレミスのデータセンターとOCIを接続するFastConnect回線そのものに対して、レイヤー2（イーサネット）レベルでのラインレートハードウェア暗号化を提供する技術はどれか？",
    choices: [
      "MACsec (IEEE 802.1AE)",
      "IPsec over FastConnect",
      "TLS 1.3 トンネル",
      "SSL-VPN ゲートウェイ"
    ],
    correctIndex: 0,
    explanation: "OCI FastConnectはMACsec（メディアアクセス制御セキュリティ）をサポートしており、ルーター間の直接物理リンク上で暗号化オーバーヘッドなしに通信を暗号化できます。",
    rewardGold: 4
  },
  {
    id: "q_net_016",
    domain: "OCI",
    relatedUnitId: "oci_vcn",
    difficulty: 2,
    question: "VCN内のサブネットで、プライベートIPアドレスに加えて「パブリックIPv4アドレス」の自動割り当てを許可できるサブネットタイプはどれか？",
    choices: [
      "パブリック・サブネット (Public Subnet) のみ",
      "プライベート・サブネットのみ",
      "両方のサブネットで自由に割り当て可能",
      "DMZサブネットのみ"
    ],
    correctIndex: 0,
    explanation: "パブリックIPv4アドレスをVNICに割り当てられるのは、パブリック・サブネットとして作成されたサブネット内のリソースのみです（プライベートサブネットではパブリックIPの付与自体が禁止されます）。",
    rewardGold: 3
  },
  {
    id: "q_net_017",
    domain: "OCI",
    relatedUnitId: "oci_vcn",
    difficulty: 3,
    question: "VCN内のすべてのパケット送受信メタデータ（送信元/宛先IP、ポート、プロトコル、パケット数、アクション: ACCEPT/REJECT）をキャプチャし、セキュリティ分析のために記録する機能はどれか？",
    choices: [
      "VCN フロー・ログ (VCN Flow Logs)",
      "パケット・スニッファ・サービス",
      "NetFlow アナライザ",
      "Network Trace"
    ],
    correctIndex: 0,
    explanation: "VCN Flow Logsを有効にすると、サブネットやVNICを通過するトラフィックログがOCI Loggingサービスに記録され、不正アクセスの追跡や接続トラブルの解析に活用できます。",
    rewardGold: 4
  },
  {
    id: "q_net_018",
    domain: "OCI",
    relatedUnitId: "oci_lb",
    difficulty: 2,
    question: "OCI Network Load Balancer (NLB) の最大の特長であり、Flexible Load Balancer (LB) と比較した際の優位性はどれか？",
    choices: [
      "レイヤー4（TCP/UDP）の極めて低いレイテンシと超高スループット、クライアント送信元IPの完全保持",
      "レイヤー7のURLベースルーティング機能の搭載",
      "WAFルールの直接適用",
      "SSL/TLS証明書の終端処理（オフロード）機能"
    ],
    correctIndex: 0,
    explanation: "NLBは非プロキシ型（パススルー）のL4ロードバランサであり、パケットヘッダーを変更せずに極小レイテンシで転送し、クライアントの送信元IPをそのままバックエンドへ渡すことができます。",
    rewardGold: 3
  },

  // --- 高度なコンテナ＆サーバーレス (Advanced Container & Serverless) ---
  {
    id: "q_oke_001",
    domain: "OCI",
    relatedUnitId: "oci_oke",
    difficulty: 3,
    question: "OKE（Kubernetes）クラスタにおいて、Podに対してVCNサブネットのネイティブなIPアドレスを直接割り当て、VCNのセキュリティリストやNSGをPod単位で適用できるようにするネットワークプラグインはどれか？",
    choices: [
      "OCI VCN Native Pod Networking (VCN-Native CNI)",
      "Flannel CNI",
      "Calico VxLAN",
      "Host-Port Overlay"
    ],
    correctIndex: 0,
    explanation: "OCI VCN-Native Pod Networkingを利用すると、PodがVCNサブネットから直接IPを取得するため、オーバーレイ網のオーバーヘッドがなく、NSGによるきめ細かなネットワークアクセス制御が可能になります。",
    rewardGold: 4
  },
  {
    id: "q_oke_002",
    domain: "OCI",
    relatedUnitId: "oci_oke",
    difficulty: 2,
    question: "OKEのKubernetesクラスタを作成する際、コントロールプレーン（APIサーバー）の運用管理コストやSLA保証を含むエンタープライズ向けクラスタタイプはどれか？",
    choices: [
      "拡張クラスタ (Enhanced Cluster)",
      "基本クラスタ (Basic Cluster)",
      "専用コントロールプレーン・クラスタ",
      "カスタム・マスター・クラスタ"
    ],
    correctIndex: 0,
    explanation: "Enhanced Clusterは、SLA保証、仮想ノードのサポート、ノードアドオンのライフサイクル管理機能などを備えた本番運用向けのOKEクラスタタイプです。",
    rewardGold: 3
  },
  {
    id: "q_fn_001",
    domain: "OCI",
    relatedUnitId: "oci_functions",
    difficulty: 2,
    question: "OCI Functionsの単一の関数実行における最大実行タイムアウト時間の上限はどれか？",
    choices: [
      "最長5分 (300秒)",
      "最長15分 (900秒)",
      "最長1時間",
      "無制限"
    ],
    correctIndex: 0,
    explanation: "OCI Functionsの1回の呼び出しあたりの最大実行時間は最長5分（300秒）に設計されており、より長時間のバッチ処理にはContainer InstancesやCompute、Data Flowが推奨されます。",
    rewardGold: 3
  },
  {
    id: "q_fn_002",
    domain: "OCI",
    relatedUnitId: "oci_functions",
    difficulty: 2,
    question: "サーバーレス環境でありながら、VMの立ち上げやOS管理なしに、単一または複数のコンテナを秒単位で即座に直接起動・実行できるサービスはどれか？",
    choices: [
      "OCI Container Instances",
      "OKE Managed Nodes",
      "OCI Functions Classic",
      "Cloud Shell Containers"
    ],
    correctIndex: 0,
    explanation: "OCI Container Instancesは、Kubernetesの学習コストや管理不要で、コンテナイメージとCPU/メモリを指定するだけで瞬時にサーバーレスコンテナを起動できるサービスです。",
    rewardGold: 3
  },

  // --- 高度なセキュリティ・暗号化・DBアーキテクチャ (Security & Advanced DB) ---
  {
    id: "q_sec_018",
    domain: "OCI",
    relatedUnitId: "oci_vault",
    difficulty: 3,
    question: "最高レベルのセキュリティ要件（PCI DSSや政府調達基準）を満たすため、シングルテナント専用のFIPS 140-2 レベル3認定HSMパーティションを専有できるVaultのプランはどれか？",
    choices: [
      "Virtual Private Vault (専用Vault)",
      "Default Shared Vault",
      "Standard Key Ring",
      "Dedicated Security Zone"
    ],
    correctIndex: 0,
    explanation: "Virtual Private Vaultは専用のHSMパーティションを提供し、他テナントから物理的に隔離されたシングルテナント環境で暗号化キーを厳格に保持・制御します。",
    rewardGold: 4
  },
  {
    id: "q_sec_019",
    domain: "OCI",
    relatedUnitId: "oci_bastion",
    difficulty: 3,
    question: "プライベートサブネット内のデータベースやWeb管理コンソールに対し、踏み台SSH接続を経由してローカルPCの特定ポートから安全にトンネリングアクセスするBastionセッションタイプはどれか？",
    choices: [
      "ポート・フォワーディング・セッション (Port Forwarding Session)",
      "マネージドSSHセッション",
      "Direct VCN セッション",
      "IPsec プロキシセッション"
    ],
    correctIndex: 0,
    explanation: "ポート・フォワーディング・セッションを使用すると、ローカルPCのポートをBastion経由でプライベートIP/ポートへトンネル転送でき、直接ルーティングのないプライベートDB等へ安全に接続できます。",
    rewardGold: 4
  },
  {
    id: "q_db_015",
    domain: "OCI",
    relatedUnitId: "oci_atp",
    difficulty: 3,
    question: "Oracle Databaseの「透過的データ暗号化 (TDE: Transparent Data Encryption)」において、OCI Vaultの顧客管理キー（CMK）を利用する主なメリットはどれか？",
    choices: [
      "暗号化マスターキーのライフサイクルやローテーションを顧客自身が完全に管理・監査できる",
      "SQLクエリの検索速度が暗号化によって高速化する",
      "テーブルスペースのディスク容量を半分に圧縮できる",
      "バックアップの取得時間が不要になる"
    ],
    correctIndex: 0,
    explanation: "Oracle提供のデフォルト管理キーではなく、OCI VaultのCMKとTDEを統合することで、企業ポリシーに応じたマスターキーの有効化・無効化・自動ローテーション管理が可能になります。",
    rewardGold: 4
  },
  {
    id: "q_db_016",
    domain: "OCI",
    relatedUnitId: "oci_atp",
    difficulty: 3,
    question: "Exadata Cloud Infrastructureにおいて、データベースサーバーとストレージサーバー間を接続する超広帯域・超低遅延な内部ファブリックネットワーク規格はどれか？",
    choices: [
      "RoCE (RDMA over Converged Ethernet) / InfiniBand",
      "100G 光ファイバー イーサネット",
      "PCIe 外部バスブリッジ",
      "iSCSI 専用ファブリック"
    ],
    correctIndex: 0,
    explanation: "Exadataは内部インターコネクトにInfiniBandまたはRoCE（RDMA over Converged Ethernet）を採用しており、CPUをバイパスしてメモリ間で直接データ転送を行うことで極限のIOPSと低遅延を実現しています。",
    rewardGold: 4
  },
  {
    id: "q_db_017",
    domain: "OCI",
    relatedUnitId: "oci_atp",
    difficulty: 2,
    question: "Autonomous Databaseで開発・テスト環境をすばやく準備するため、既存DBのメタデータ定義のみを複製し、実データを含まない空のDBを瞬時に複製する機能はどれか？",
    choices: [
      "メタデータ・クローン (Metadata Clone)",
      "フル・クローン (Full Clone)",
      "バックアップ・スナップショット",
      "スキーマ・エクスポート"
    ],
    correctIndex: 0,
    explanation: "メタデータ・クローンは、本番DBのスキーマ構造やDB構成定義のみを複製して空の新規データベースを数分で作成する機能で、開発環境の迅速な立ち上げに最適です。",
    rewardGold: 3
  },
  {
    id: "q_net_019",
    domain: "OCI",
    relatedUnitId: "oci_vcn",
    difficulty: 3,
    question: "OCI DNSサービスにおいて、パブリックインターネットに公開せず、VCN内（またはFastConnect接続先）のリソースのみが名前解決できる閉域DNSゾーンはどれか？",
    choices: [
      "プライベートDNSゾーン (Private DNS Zones)",
      "スプリット・ホライゾン・ゾーン",
      "ローカル・リゾルバ・ゾーン",
      "内部ドメイン・レジストリ"
    ],
    correctIndex: 0,
    explanation: "プライベートDNSゾーンを作成してプライベート・ビューをVCNに関連付けることで、外部に露出することなく社内専用のドメイン名によるセキュアな名前解決が可能になります。",
    rewardGold: 4
  },
  {
    id: "q_sec_020",
    domain: "OCI",
    relatedUnitId: "oci_iam",
    difficulty: 2,
    question: "OCIコンソールへのログイン時に、パスワードに加えてスマートフォンアプリ（Oracle Mobile Authenticator等）による多要素認証（MFA）を全ユーザーに強制する設定場所はどれか？",
    choices: [
      "アイデンティティ・ドメインのサインオン・ポリシー (Sign-on Policies)",
      "コンパートメント・セキュリティ・ルール",
      "Cloud Guard レスポンダ・レシピ",
      "テナンシ・プロファイル・オーバーライド"
    ],
    correctIndex: 0,
    explanation: "OCI IAM（Identity Domains）のサインオン・ポリシーにおいて、特定グループまたは全ユーザーに対してMFAプロンプトを条件付き/常に要求するルールを定義して強制します。",
    rewardGold: 3
  },

  // --- 組織ガバナンス・誤削除防止 ---
  {
    id: "q_ent_005",
    domain: "OCI",
    relatedUnitId: "oci_iam",
    difficulty: 3,
    question: "OCIテナンシにおいて、本番環境の重要リソース（コンピュートインスタンス、VCN、DB等）が管理者による誤操作やスクリプトによって誤って削除されるのを防ぐため、リソースやコンパートメントに適用できる保護機能はどれか？",
    choices: [
      "リソース・ロック (Resource Locks)",
      "セキュリティ・ゾーン",
      "コンパートメント・クォータ",
      "IAM デリート・シールド"
    ],
    correctIndex: 0,
    explanation: "リソース・ロック（Resource Locks）を適用すると、「削除禁止（Delete Lock）」または「変更・削除禁止（Read-Only Lock）」を設定でき、意図しない重要リソースの破棄を確実に防止できます。",
    rewardGold: 4
  }
];
