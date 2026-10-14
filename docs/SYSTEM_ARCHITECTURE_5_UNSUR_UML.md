# Dokumentasi Arsitektur Sistem & 5 Unsur Perancangan UML
## Proyek: yokBangun — Solusi Digital & AI (`company-profile`)

Dokumen ini memuat dokumentasi rancang bangun teknis komprehensif sistem **yokBangun**, mencakup **5 Unsur Perancangan Perangkat Lunak**:
1. **ERD (Entity Relationship Diagram)**
2. **LRS (Logical Record Structure)**
3. **LSF (Logical System Flow / Diagram Alir Sistem Logis)**
4. **Use Case Diagram & Spesifikasi Use Case**
5. **Activity Diagram & Pemodelan UML (Class, Sequence, Component, & Deployment Diagram)**

---

## 1. ERD (Entity Relationship Diagram)

ERD menggambarkan pemodelan data konseptual yokBangun yang mencakup entitas bisnis (Klien, Kebutuhan Proyek, Portofolio, Katalog Produk) serta entitas operasional PWA dan integrasi aplikasi Android.

```mermaid
erDiagram
    CLIENT ||--o{ CONTACT_INQUIRY : submits
    CLIENT ||--o{ PARTNERSHIP_INQUIRY : proposes
    CLIENT ||--o{ DEVICE_SESSION : operates

    SECTOR ||--o{ PRODUCT : categorizes
    SECTOR ||--o{ CASE_STUDY : classifies
    SECTOR ||--o{ CONTACT_INQUIRY : targets

    PROJECT_STAGE ||--o{ CONTACT_INQUIRY : defines
    PRODUCT_STATUS ||--o{ PRODUCT : marks

    CONTACT_INQUIRY ||--o{ WEBHOOK_DELIVERY : triggers
    PARTNERSHIP_INQUIRY ||--o{ WEBHOOK_DELIVERY : triggers

    DEVICE_SESSION ||--o{ APP_LINK_INTENT : initiates

    CLIENT {
        string client_id PK
        string ip_address
        string user_agent
        string preferred_lang
        datetime first_seen_at
        datetime last_seen_at
    }

    SECTOR {
        string sector_key PK "umkm, home-business, rt-rw, pendidikan, kesehatan"
        string name_id
        string name_en
        string description_id
        string description_en
        string icon_tag
    }

    PROJECT_STAGE {
        string stage_key PK "exploring, planning, prototype, concept, has-product, maintenance, ai, partner"
        string label_id
        string label_en
        int priority_level
    }

    PRODUCT_STATUS {
        string status_key PK "concept, prototype, pilot, active, maintenance"
        string label
        string badge_tone
        string description_id
        string description_en
    }

    PRODUCT {
        string slug PK
        string sector_key FK
        string status_key FK
        string name
        string for_whom_id
        string for_whom_en
        string problem_id
        string problem_en
        json capabilities_id
        json capabilities_en
        boolean is_active
    }

    CASE_STUDY {
        string slug PK
        string sector_key FK
        string title_id
        string title_en
        string problem_id
        string problem_en
        json built_modules_id
        json built_modules_en
        json technology_stack
        string outcome_id
        string outcome_en
        boolean is_published
    }

    CONTACT_INQUIRY {
        string inquiry_id PK
        string client_id FK
        string sector_key FK
        string stage_key FK
        string name
        string organisation
        string email
        string whatsapp
        string need_description
        string honeypot_website
        string source_channel "web, pwa, android_app"
        datetime submitted_at
    }

    PARTNERSHIP_INQUIRY {
        string partnership_id PK
        string client_id FK
        string type "technology, business, community, institution, research, investor"
        string name
        string organisation
        string email
        string message
        datetime submitted_at
    }

    WEBHOOK_DELIVERY {
        string delivery_id PK
        string inquiry_id FK
        string endpoint_url
        string payload_json
        int response_status
        int retry_count
        datetime delivered_at
        string status "success, failed, retried"
    }

    DEVICE_SESSION {
        string session_id PK
        string client_id FK
        string platform "android, pwa, ios, desktop_web"
        boolean is_pwa_installed
        boolean is_native_app_installed
        string deep_link_target
        datetime created_at
    }

    APP_LINK_INTENT {
        string intent_id PK
        string session_id FK
        string package_name "id.yokbangun.app"
        string raw_path_query
        string fallback_url
        datetime triggered_at
    }
```

---

## 2. LRS (Logical Record Structure)

LRS merepresentasikan struktur rekaman tabel relasional ternormalisasi (3NF) lengkap dengan *Primary Key* (PK), *Foreign Key* (FK), tipe data, dan konstrain integritas data:

```
┌──────────────────────────────────────────────────────────────┐
│ SECTOR                                                       │
├──────────────────────────────┬───────────────────────────────┤
│ * sector_key (PK)            │ VARCHAR(32)                   │
│   name_id                    │ VARCHAR(80) NOT NULL          │
│   name_en                    │ VARCHAR(80) NOT NULL          │
│   description_id             │ TEXT                          │
│   description_en             │ TEXT                          │
│   icon_tag                   │ VARCHAR(32)                   │
└──────────────────────────────┴───────────────────────────────┘
          │ (1:N)                                │ (1:N)
          ▼                                      ▼
┌──────────────────────────────┐       ┌──────────────────────────────┐
│ PRODUCT                      │       │ CASE_STUDY                   │
├──────────────────────────────┤       ├──────────────────────────────┤
│ * slug (PK)                  │       │ * slug (PK)                  │
│ * sector_key (FK)            │       │ * sector_key (FK)            │
│ * status_key (FK)            │       │   title_id                   │
│   name                       │       │   title_en                   │
│   for_whom_id                │       │   problem_id                 │
│   problem_id                 │       │   problem_en                 │
│   capabilities_json          │       │   technology_stack_json      │
│   is_active                  │       │   built_modules_json         │
└──────────────────────────────┘       │   outcome_id                 │
          ▲                            │   is_published               │
          │ (N:1)                      └──────────────────────────────┘
┌──────────────────────────────┐
│ PRODUCT_STATUS               │
├──────────────────────────────┤
│ * status_key (PK)            │
│   label                      │
│   badge_tone                 │
│   description_id             │
└──────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ CLIENT                                                       │
├──────────────────────────────┬───────────────────────────────┤
│ * client_id (PK)             │ VARCHAR(64)                   │
│   ip_address_hash            │ VARCHAR(64) NOT NULL          │
│   preferred_lang             │ VARCHAR(5) DEFAULT 'id'       │
│   user_agent                 │ VARCHAR(255)                  │
│   first_seen_at              │ TIMESTAMP DEFAULT NOW()       │
│   last_seen_at               │ TIMESTAMP DEFAULT NOW()       │
└──────────────────────────────┴───────────────────────────────┘
          │ (1:N)                                │ (1:N)
          ▼                                      ▼
┌──────────────────────────────┐       ┌──────────────────────────────┐
│ CONTACT_INQUIRY              │       │ DEVICE_SESSION               │
├──────────────────────────────┤       ├──────────────────────────────┤
│ * inquiry_id (PK)            │       │ * session_id (PK)            │
│ * client_id (FK)             │       │ * client_id (FK)             │
│ * sector_key (FK)            │       │   platform                   │
│ * stage_key (FK)             │       │   is_pwa_installed           │
│   name                       │       │   is_native_app_installed    │
│   organisation               │       │   deep_link_target           │
│   email                      │       │   created_at                 │
│   whatsapp                   │       └──────────────────────────────┘
│   need_description           │                         │ (1:N)
│   source_channel             │                         ▼
│   submitted_at               │       ┌──────────────────────────────┐
└──────────────────────────────┘       │ APP_LINK_INTENT              │
          │ (1:N)                      ├──────────────────────────────┤
          ▼                            │ * intent_id (PK)             │
┌──────────────────────────────┐       │ * session_id (FK)            │
│ WEBHOOK_DELIVERY             │       │   package_name               │
├──────────────────────────────┤       │   raw_path_query             │
│ * delivery_id (PK)           │       │   fallback_url               │
│ * inquiry_id (FK)            │       │   triggered_at               │
│   endpoint_url               │       └──────────────────────────────┘
│   payload_json               │
│   response_status            │
│   status                     │
│   delivered_at               │
└──────────────────────────────┘
```

### Karakteristik Normalisasi Data (3NF):
1. **Atribut Atomik**: Seluruh nilai kolom (nama, email terverifikasi regex, status kode) bersifat atomik.
2. **Ketergantungan Fungsional Penuh**: Setiap atribut non-kunci bergantung secara utuh pada *Primary Key* masing-masing tabel.
3. **Bebas Ketergantungan Transitif**: Status kode dipisahkan ke dalam tabel referensi lookup `PRODUCT_STATUS` dan `PROJECT_STAGE`, mencegah anomali pembaruan teks deskripsi status di banyak tempat.

---

## 3. LSF (Logical System Flow / Diagram Alir Sistem Logis)

LSF menggambarkan sirkulasi pemrosesan logika sistem dari saat klien mengirimkan permintaan HTTP, pemrosesan di Vercel Edge Serverless, Service Worker caching, perutean App Links Android, hingga pengiriman webhook aman.

```mermaid
flowchart TD
    Start([User Request / Navigation]) --> SWCheck{Service Worker Installed?}
    
    %% Service Worker Layer
    SWCheck -- Ya --> SWStrategy{Tipe Permintaan HTTP}
    SWCheck -- Tidak --> VercelEdge[Vercel Global Edge Network]
    
    SWStrategy -- "POST /api/contact" --> NetOnly[Strategy: Network-Only]
    SWStrategy -- "Aset Statis / Fonts / SVG" --> CacheFirst[Strategy: Cache-First]
    SWStrategy -- "API Produk / Halaman HTML" --> SWR[Strategy: Stale-While-Revalidate]

    NetOnly --> CheckOnline{Perangkat Online?}
    CheckOnline -- Tidak --> ReturnOfflineJSON[Return Offline Error 503 JSON]
    CheckOnline -- Ya --> FetchAPI[Forward Fetch ke Server Vercel]

    CacheFirst --> MatchStaticCache{Tersedia di Static Cache?}
    MatchStaticCache -- Ya --> ReturnStatic[Sajikan Aset Seketika]
    MatchStaticCache -- Tidak --> FetchStaticNetwork[Unduh dari Network & Simpan ke Cache]
    FetchStaticNetwork --> ReturnStatic

    SWR --> SWRMatch{Ada di Cache?}
    SWRMatch -- Ya --> ReturnCachedAndRevalidate[Sajikan Cache & Perbarui di Latar Belakang]
    SWRMatch -- Tidak --> FetchNav[Ambil dari Network]
    FetchNav -- Gagal / Offline --> FallbackOfflineHTML[Sajikan public/offline.html 503 Fallback]
    FetchNav -- Sukses --> UpdateCacheNav[Simpan ke Cache & Tampilkan]

    %% Vercel Edge & Routing Engine
    ReturnOfflineJSON --> End([Selesai])
    ReturnStatic --> End
    ReturnCachedAndRevalidate --> End
    FallbackOfflineHTML --> End
    UpdateCacheNav --> End

    FetchAPI --> VercelEdge
    VercelEdge --> VercelHeaders[Evaluasi vercel.json Headers]
    VercelHeaders --> CheckWellKnown{Path /.well-known/*?}
    
    CheckWellKnown -- Ya --> ServeAssetLinks[Sajikan assetlinks.json 200 JSON no-redirect]
    CheckWellKnown -- Tidak --> RewriteEngine[next.config.ts Rewrite Engine]

    ServeAssetLinks --> End

    RewriteEngine --> CheckLocalePrefix{Ada Prefix /en?}
    CheckLocalePrefix -- Tidak --> RewriteDefaultID[Rewrite Transparan ke /id/:path]
    CheckLocalePrefix -- Ya --> RouteEn[Sajikan /en/:path]

    RewriteDefaultID --> AppRouter[Next.js App Router Engine]
    RouteEn --> AppRouter

    %% Deep Link & Query Sync
    AppRouter --> QuerySyncCheck{Query String Parity}
    QuerySyncCheck -- "?lang=id|en" --> SyncLang[Simpan yokbangun_lang & Sesuaikan Route]
    QuerySyncCheck -- "?status=concept" --> FilterProducts[Pilih Tab Status Produk Sesuai URL]
    QuerySyncCheck -- "?sector=umkm" --> FilterWork[Saring Portfolio Kasus UMKM]
    QuerySyncCheck -- "?stage=prototype" --> PreFillContact[Otomasi Dropdown Sektor & Radio Stage]

    %% Android Transition Detection
    AppRouter --> UAAndroidCheck{User Agent Android & Bukan WebView?}
    UAAndroidCheck -- Ya --> RenderBanner[Tampilkan AndroidAppBanner #1F5D45 & #E6F2ED]
    UAAndroidCheck -- Tidak --> NormalPageRender[Render Halaman Penuh]

    RenderBanner --> ClickAction{Interaksi User di Banner}
    ClickAction -- "Buka di Aplikasi" --> IntentURL[Luncurkan intent:// URI Scheme]
    IntentURL --> CheckNativeInstalled{Aplikasi Terpasang?}
    CheckNativeInstalled -- Ya --> OpenNativeCompose[Buka Screen Jetpack Compose Terkait]
    CheckNativeInstalled -- Tidak --> FallbackDownloadRedirect[Buka /download]

    ClickAction -- "Unduh APK" --> FallbackDownloadRedirect
    ClickAction -- "Tutup" --> DismissBanner[Simpan sessionStorage yb_android_banner_dismissed]
```

---

## 4. Use Case Diagram & Spesifikasi Use Case

### 4.1. Use Case Diagram (UML)

```mermaid
flowchart LR
    %% Actors
    ActorVisitor((Pengunjung Web))
    ActorClient((Pemilik Usaha / Klien))
    ActorAndroidUser((Pengguna HP Android))
    ActorAdmin((Sistem Notifikasi / Webhook))

    subgraph yokBangun Ecosystem [Sistem Web & PWA yokBangun]
        UC1([Jelajahi Profil & Solusi Sektoral])
        UC2([Saring Produk Berdasarkan Status])
        UC3([Eksplorasi Studi Kasus Sektoral])
        UC4([Ganti Bahasa ID / EN])
        UC5([Kirim Permintaan Konsultasi Proyek])
        UC6([Akses Informasi Saat Offline])
        UC7([Deteksi & Pasang PWA])
        UC8([Transisi ke Native Android via Deep Link])
        UC9([Unduh Paket APK yokbangun.apk])
        UC10([Verifikasi Digital Asset Links])
        UC11([Ingest & Disposisi Webhook Notifikasi])
    end

    ActorVisitor --> UC1
    ActorVisitor --> UC2
    ActorVisitor --> UC3
    ActorVisitor --> UC4
    ActorVisitor --> UC6
    ActorVisitor --> UC7

    ActorClient --> UC5
    ActorClient --> UC4
    ActorClient --> UC2
    ActorClient --> UC3

    ActorAndroidUser --> UC8
    ActorAndroidUser --> UC9
    ActorAndroidUser --> UC1

    UC5 -.->|triggers| UC11
    ActorAdmin --> UC11
    ActorAndroidUser -.->|verifies| UC10
```

### 4.2. Spesifikasi Use Case Utama

| ID | Nama Use Case | Aktor | Kondisi Awal (Pre-condition) | Alur Utama (Main Scenario) | Kondisi Akhir (Post-condition) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **UC-01** | Saring Produk via Deep Link (`?status=...`) | Pengunjung, Pengguna Android | Pengguna mengakses URL beranda atau `/products` dengan parameter `?status=concept` atau `?status=prototype`. | 1. Sistem memeriksa query string `status`.<br>2. Halaman beranda otomatis me-redirect ke `/products?status=concept`.<br>3. Komponen `ProductList` mengaktifkan tab filter yang sesuai tanpa me-reload DOM.<br>4. URL browser terbarui secara instan. | Hanya produk dengan status terpilih yang ditampilkan di layar. |
| **UC-02** | Pre-fill Formulir Kontak (`/contact?sector=...&stage=...`) | Pemilik Usaha / Klien | Pengguna mengklik tautan konsultasi dari halaman sektor atau aplikasi Android. | 1. Sistem mem-parsing `sector` dan `stage` dari URL query.<br>2. Formulir memilih otomatis dropdown Sektor (contoh: "UMKM") dan radio button Stage (contoh: "Tahap Prototype").<br>3. Pengguna melengkapi nama, organisasi, email, whatsapp, dan deskripsi kebutuhan.<br>4. Pengguna menekan tombol submit. | Data terkirim dengan validasi 201 Created dan diteruskan ke webhook. |
| **UC-03** | Transisi ke Native Android via Intent | Pengguna Android | Pengguna menggunakan browser Chrome di smartphone Android membuka situs yokBangun. | 1. Komponen `AndroidAppBanner` mendeteksi OS Android.<br>2. Banner menampilkan CTA *"Buka di Aplikasi"* dan *"Unduh APK"* berpalet `#1F5D45`.<br>3. Pengguna menekan *"Buka di Aplikasi"*.<br>4. Browser meluncurkan URI `intent://yok-bangun.vercel.app/...#Intent;package=id.yokbangun.app;S.browser_fallback_url=...;end`.<br>5. Jika aplikasi terpasang, OS Android membuka Jetpack Compose; jika tidak, dialihkan ke `/download`. | Pengguna berada di native app atau mendarat di panduan download. |
| **UC-04** | Navigasi Offline Fallback | Pengunjung PWA | Koneksi internet terputus saat pengguna membuka halaman baru. | 1. Browser mengirim request navigasi HTML.<br>2. Service Worker mendeteksi koneksi terputus.<br>3. Service Worker menyajikan [public/offline.html](file:///c:/Users/user/Desktop/company-profile/public/offline.html) mandiri.<br>4. Pengguna tetap dapat membaca ringkasan layanan dalam Bahasa Indonesia atau English.<br>5. Formulir kontak menampilkan peringatan proteksi offline. | Pengguna tetap mendapatkan informasi tanpa melihat layar blank browser. |

---

## 5. Activity Diagram & Pemodelan UML

### 5.1. Activity Diagram: Alur Pengiriman Formulir Kontak & Proteksi Offline

```mermaid
stateDiagram-v2
    [*] --> BukaFormulir: Pengguna membuka /contact
    BukaFormulir --> PeriksaURLQuery: Deteksi parameter ?sector & ?stage
    PeriksaURLQuery --> PreFillField: Otomasi pilihan Sektor & Tahap Proyek
    PreFillField --> IsiData: Pengguna mengisi nama, email, whatsapp, & kebutuhan
    IsiData --> TekanSubmit: Klik "Kirim Pesan"
    
    state ValidasiClient {
        [*] --> CekKoneksi
        CekKoneksi --> OfflineError: Navigator offline / fetch gagal
        OfflineError --> TampilkanPeringatanOffline: Tampilkan pesan offline 503 terstruktur
        TampilkanPeringatanOffline --> [*]

        CekKoneksi --> ValidasiFormat: Format Email, WA, Min Length
        ValidasiFormat --> TampilkanErrorKlien: Data tidak valid
        TampilkanErrorKlien --> [*]
        ValidasiFormat --> KirimKeServer: Data valid (POST /api/contact)
    }

    state ServerProcessing {
        [*] --> RateLimitCheck: Periksa limit 5 req / 10 menit
        RateLimitCheck --> RateLimitExceeded: Melebihi batas
        RateLimitExceeded --> Return429: Kirim respon 429 Retry-After
        
        RateLimitCheck --> SafeBodyGuard: Cek ukuran payload (Maks 64KB)
        SafeBodyGuard --> PayloadTooLarge: > 64KB (Respon 413)
        
        SafeBodyGuard --> HoneypotCheck: Periksa field tersembunyi "website"
        HoneypotCheck --> DropSilentBot: Field terisi (Bot Terdeteksi)
        DropSilentBot --> Return201Silent: Beri respon 201 pura-pura
        
        HoneypotCheck --> ServerValidation: Validasi schema backend
        ServerValidation --> DeliverWebhook: Kirim data ke Discord/Slack Webhook
        DeliverWebhook --> Return201Success: Kirim respon 201 Created
    }

    TekanSubmit --> ValidasiClient
    KirimKeServer --> ServerProcessing
    Return201Success --> TampilkanKartuSukses: UI menampilkan tanda centang sukses
    Return429 --> TampilkanAlertError: UI menampilkan pesan coba lagi
    TampilkanKartuSukses --> [*]
    TampilkanAlertError --> [*]
```

### 5.2. Activity Diagram: Alur Transisi Android App Links & Smart Banner

```mermaid
stateDiagram-v2
    [*] --> KunjungiHalaman: Pengguna membuka yok-bangun.vercel.app
    KunjungiHalaman --> EvaluasiKlien: Eksekusi useSyncExternalStore

    state EvaluasiPerangkat {
        [*] --> CekOS: navigator.userAgent regex /Android/i
        CekOS --> BukanAndroid: Bukan perangkat Android
        BukanAndroid --> SembunyikanBanner: Tidak render banner
        
        CekOS --> CekWebView: Cek ?source=android_app / yokBangunMobile
        CekWebView --> SedangDiApp: Sudah di dalam aplikasi native
        SedangDiApp --> SembunyikanBanner

        CekWebView --> CekDismissal: Cek sessionStorage yb_android_banner_dismissed
        CekDismissal --> SudahDitutup: Pernah ditutup di sesi ini
        SudahDitutup --> SembunyikanBanner

        CekDismissal --> TampilkanBanner: Belum ditutup
        TampilkanBanner --> [*]
    }

    EvaluasiPerangkat --> MenungguAksi
    
    state MenungguAksi {
        [*] --> OpsiAksi
        OpsiAksi --> KlikBukaApp: Pengguna klik "Buka di Aplikasi"
        OpsiAksi --> KlikUnduh: Pengguna klik "Unduh APK"
        OpsiAksi --> KlikTutup: Pengguna klik "✕"
    }

    KlikTutup --> SimpanSessionStorage: Set yb_android_banner_dismissed = 1
    SimpanSessionStorage --> HapusBannerDariDOM: Hilangkan banner
    HapusBannerDariDOM --> [*]

    KlikUnduh --> NavigasiDownloadPage: Router push ke /download
    NavigasiDownloadPage --> [*]

    KlikBukaApp --> TriggerIntent: Eksekusi URI Intent Android
    state TriggerIntent {
        [*] --> CekPackageApp: Intent filter id.yokbangun.app
        CekPackageApp --> AppAda: Aplikasi terpasang
        AppAda --> BukaActivityCompose: Langsung buka screen dengan deep link query
        
        CekPackageApp --> AppTidakAda: Aplikasi belum terpasang
        AppTidakAda --> TriggerBrowserFallback: Gunakan S.browser_fallback_url
        TriggerBrowserFallback --> RedirectKeDownload: Buka https://yok-bangun.vercel.app/download
    }
    BukaActivityCompose --> [*]
    RedirectKeDownload --> [*]
```

---

### 5.3. UML Class Diagram

Diagram kelas ini memperlihatkan pemisahan tanggung jawab antarmuka, store state klien, API handler, dan komponen presentasi:

```mermaid
classDiagram
    class NextConfig {
        +boolean reactStrictMode
        +boolean compress
        +redirects() Promise~RedirectRule[]~
        +rewrites() Promise~RewriteRule[]~
        +headers() Promise~HeaderRule[]~
    }

    class LanguageStore {
        +Locale language
        +boolean hasChosen
        +setLanguage(Locale language) void
    }

    class LocalePreference {
        +Locale locale
        +useEffect() void
    }

    class AndroidAppBanner {
        +Locale locale
        -boolean isVisible
        +handleDismiss() void
        +render() JSX.Element
    }

    class ProductList {
        +Locale locale
        +Product[] initialData
        -ProductStatus selectedStatus
        +handleSelectStatus(ProductStatus status) void
        +render() JSX.Element
    }

    class CaseStudyList {
        +Locale locale
        +CaseStudy[] initialData
        -string selectedSector
        +handleSelectSector(string sectorKey) void
        +render() JSX.Element
    }

    class ContactForm {
        +Locale locale
        -ContactInput values
        -FieldErrors errors
        -boolean submitted
        +handleChange(string field, string value) void
        +handleSubmit(FormEvent event) void
        +render() JSX.Element
    }

    class ContactSchema {
        +string[] projectStages
        +validateContact(unknown raw) ValidationResult
    }

    class ServiceWorker {
        +string CACHE_VERSION
        +string[] PRECACHE_ASSETS
        +install(Event e) void
        +activate(Event e) void
        +fetch(FetchEvent e) void
        -isStaticAsset(URL url, Request req) boolean
        -isPublicContentApi(URL url) boolean
    }

    class RouteAssetlinks {
        +GET() NextResponse
    }

    class RouteContact {
        +POST(Request req) Promise~NextResponse~
    }

    ContactForm ..> ContactSchema : validates using
    ContactForm ..> RouteContact : submits to
    LocalePreference ..> LanguageStore : reads/syncs with
    AndroidAppBanner ..> NextConfig : deep links follow
    RouteAssetlinks ..> NextConfig : exempted from rewrites
    ProductList ..> LanguageStore : displays localized content
    CaseStudyList ..> LanguageStore : displays localized content
    ServiceWorker ..> RouteContact : applies Network-Only guard
```

---

### 5.4. UML Sequence Diagram: Deep Link Intent & Form Ingestion

Diagram urutan berikut menggambarkan alur interaksi antara Pengguna, Browser, Service Worker, Next.js Serverless API, dan Webhook Target:

```mermaid
sequenceDiagram
    autonumber
    actor User as Pengguna Android
    participant UI as Browser / Web UI
    participant SW as Service Worker (sw.js)
    participant Edge as Vercel Edge Router
    participant API as Route Handler (/api/contact)
    participant WH as Webhook Destination
    actor NativeApp as Android App (Compose)

    Note over User, UI: Skenario 1: Navigasi Deep Link & Buka di Aplikasi
    User->>UI: Buka https://yok-bangun.vercel.app/work?sector=umkm
    UI->>SW: Fetch Request (Navigate)
    SW->>Edge: Forward ke server
    Edge->>UI: Response HTML (/id/work?sector=umkm)
    UI->>UI: CaseStudyList aktifkan filter 'UMKM'
    UI->>UI: AndroidAppBanner mendeteksi OS Android
    User->>UI: Klik "Buka di Aplikasi"
    UI->>NativeApp: Launch intent://yok-bangun.vercel.app/work?sector=umkm
    alt Aplikasi Native Terpasang
        NativeApp->>NativeApp: Buka Compose WorkScreen(sector="umkm")
    else Aplikasi Tidak Ada
        UI->>Edge: Redirect ke S.browser_fallback_url (/download)
        Edge->>UI: Sajikan Halaman /download
    end

    Note over User, UI: Skenario 2: Submit Kontak dengan Pre-fill
    User->>UI: Buka /contact?sector=umkm&stage=prototype&lang=id
    UI->>UI: Pre-fill otomatis: Sector="UMKM", Stage="prototype"
    User->>UI: Lengkapi form & Klik "Kirim Pesan"
    UI->>SW: POST /api/contact (JSON Payload)
    
    alt Status Offline
        SW-->>UI: Return 503 JSON ({ ok: false, offline: true })
        UI->>User: Tampilkan peringatan koneksi terputus
    else Status Online
        SW->>Edge: Network-Only Passthrough
        Edge->>API: Execute POST handler
        API->>API: Rate Limit Guard (IP Token Bucket)
        API->>API: Safe Body Guard & Honeypot Check
        API->>API: Schema Validation (validateContact)
        API->>WH: Deliver payload (Webhook async)
        WH-->>API: 200 OK Response
        API-->>SW: 201 Created ({ ok: true })
        SW-->>UI: Forward 201 Response
        UI->>User: Render Success Confirmation Card
    end
```

---

### 5.5. UML Component Diagram

Diagram komponen menguraikan subsistem modular, dependensi pustaka, dan titik integrasi:

```mermaid
componentDiagram
    package "Client Tier (Browser & PWA)" {
        [React UI Components] as Components
        [Zustand Language Store] as LangStore
        [React Query Cache] as QueryCache
        [Service Worker (sw.js)] as SW
        [Offline Fallback Page] as OfflinePage
    }

    package "Static Assets & PWA Identity" {
        [manifest.webmanifest] as Manifest
        [assetlinks.json] as Assetlinks
        [SVG & PNG App Icons] as Icons
        [yokbangun.apk] as APK
    }

    package "Next.js App Router (Vercel Serverless)" {
        [Rewrites & Headers Engine] as NextConfig
        [Localized Page Routers ([locale])] as PageRouters
        [API Route: /api/contact] as ApiContact
        [API Route: /api/v1/products] as ApiProducts
        [Security Rate Limiter & BodyGuard] as SecurityGuards
    }

    package "Mobile Platform & External Integrations" {
        [Android App (id.yokbangun.app)] as AndroidApp
        [Discord / Slack Webhooks] as WebhookTarget
    }

    Components --> LangStore : Synchronizes language
    Components --> QueryCache : Fetches and caches data
    Components ..> SW : Controlled by
    SW ..> OfflinePage : Serves on navigation offline
    SW ..> Manifest : Precaches
    SW ..> Icons : Caches First

    PageRouters --> NextConfig : Config-level rewrites
    ApiContact --> SecurityGuards : Protected by
    ApiContact --> WebhookTarget : Delivers submissions

    AndroidApp --> Assetlinks : Verifies App Links
    Components --> AndroidApp : Deep links via Intent URI
    PageRouters ..> APK : Serves download link
```

---

### 5.6. UML Deployment Diagram

Diagram *deployment* mengilustrasikan pemetaan fisik infrastruktur komputasi dari perangkat pengguna, Vercel Edge Serverless, hingga server webhook:

```mermaid
deploymentDiagram
    node "User Mobile Device / PC" <<Device>> {
        node "Web Browser (Chrome / Edge / Safari)" <<Browser>> {
            artifact "PWA Shell & Cache Storage"
            artifact "Service Worker Controller"
            artifact "DOM & React Hydration"
        }
        node "Android OS 8.0 - 15" <<Operating System>> {
            artifact "Package: id.yokbangun.app"
            artifact "Android App Links Intent Dispatcher"
        }
    }

    node "Vercel Global Edge Network" <<Cloud Infrastructure>> {
        node "Edge Cache & CDN" <<Reverse Proxy>> {
            artifact "Static Assets (/icons, /download, /manifest.webmanifest)"
            artifact "/.well-known/assetlinks.json"
            artifact "Clean URLs & Header Directives (vercel.json)"
        }
        node "Serverless Compute Region (iad1 / sin1)" <<Node.js Runtime>> {
            artifact "Next.js 16 App Router Engine"
            artifact "Route Handlers (/api/contact, /api/v1/*)"
            artifact "In-Memory Rate Limiting Token Bucket"
        }
    }

    node "External Notification Services" <<Cloud>> {
        node "Webhook Consumer Server" {
            artifact "Slack / Discord / CRM Ingestion Endpoint"
        }
    }

    "Web Browser (Chrome / Edge / Safari)" --> "Edge Cache & CDN" : HTTPS / HTTP/3 (Port 443)
    "Android OS 8.0 - 15" --> "/.well-known/assetlinks.json" : Digital Asset Links Handshake
    "Edge Cache & CDN" --> "Serverless Compute Region (iad1 / sin1)" : Internal Fast Path
    "Serverless Compute Region (iad1 / sin1)" --> "Webhook Consumer Server" : TLS 1.3 Outbound Webhook POST
```

---

Dokumentasi ini telah disinkronkan secara menyeluruh dengan implementasi kode produksi di repositori, konfigurasi perutean Vercel, serta verifikasi Digital Asset Links pada `https://yok-bangun.vercel.app/`.
