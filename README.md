# SortMaster: AI-Powered Hardware Sorting System

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black.svg?style=for-the-badge&logo=nextdotjs" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-18-blue.svg?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue.svg?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Genkit-1.x-orange.svg?style=for-the-badge&logo=google-cloud" alt="Genkit" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-38B2AC.svg?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
</p>

<p align="center">
  A sophisticated, AI-driven application designed to automate the identification and sorting of small hardware components.
</p>

---

## 📖 Table of Contents

- [🚀 Introduction](#-introduction)
- [⚙️ How It Works](#-how-it-works)
- [🖥️ Application Overview](#-application-overview)
  - [1. Camera Feed](#1-camera-feed)
  - [2. Identification & Sorting Panel](#2-identification--sorting-panel)
  - [3. Sorting Log & Inventory Tabs](#3-sorting-log--inventory-tabs)
- [🕹️ How to Use](#-how-to-use)
- [🛠️ Technical Stack](#-technical-stack)
- [🏁 Getting Started (for Developers)](#-getting-started-for-developers)
- [🤝 Contributing](#-contributing)

---

## 🚀 Introduction

**SortMaster** is an intelligent system that simulates an automated industrial sorting line. It leverages the power of generative AI to analyze a video stream of hardware items (like screws, bolts, and washers), identify them in real-time, and generate instructions for a sorting robot.

This application provides a user-friendly dashboard to monitor the entire process, from the live camera feed to detailed logs and inventory tracking, offering a glimpse into the future of automated quality control and logistics.

## ⚙️ How It Works

The application's workflow is a seamless integration of frontend components and powerful backend AI models, orchestrated by Genkit.

1.  **Item Presentation**: The system simulates a conveyor belt by presenting images of hardware items one by one in the "Camera Feed" panel.
2.  **AI Identification**: Each image is captured and sent to a Genkit flow powered by a multimodal AI model. The model analyzes the image to identify the type of hardware (e.g., "screw", "bolt"). It also assesses its confidence in the identification.
3.  **Instruction Generation**: Once an item is identified, the information is passed to a second Genkit flow. This flow determines the appropriate bin for the item and generates a clear, human-readable instruction for a mechanical sorting robot (e.g., "Move the screw to Bin 3").
4.  **Dashboard Update**: All results—the identification, confidence score, and sorting instruction—are instantly displayed in the "Identification & Sorting" panel.
5.  **Logging & Tracking**: Every sorting action is recorded in the "Sorting Log" with a timestamp and a preview image. The "Inventory" tab is updated to keep a running count of each type of hardware sorted.

This entire cycle repeats for each new item, creating a continuous and automated sorting process.

## 🖥️ Application Overview

The main interface is a comprehensive dashboard divided into several key components:

### 1. Camera Feed

This is the central monitoring station.
-   **Live View**: Displays the items as they pass through the system. When the system is running, you'll see a new hardware piece appear every few seconds.
-   **Start/Stop Control**: A toggle button allows you to start and stop the sorting process at any time.
-   **Status Indicator**: An animated overlay and progress bar show when the system is actively scanning and processing an item.

### 2. Identification & Sorting Panel

This panel displays the real-time results from the AI analysis for the currently scanned item.
-   **Identified Hardware**: Shows the name of the identified item (e.g., "Washer") next to a corresponding icon.
-   **Confidence Score**: A progress bar and percentage value indicate how certain the AI is about its identification.
-   **Assigned Bin**: The designated bin for the sorted item.
-   **Robot Instruction**: The specific command generated for the sorting robot.

### 3. Sorting Log & Inventory Tabs

Located at the bottom of the dashboard, these tabs provide historical and aggregate data.
-   **Sorting Log**: A real-time, scrollable table of every item that has been processed. Each entry includes a preview image, hardware type, assigned bin, confidence level, and the time of the sort.
-   **Inventory**: A bar chart that visualizes the total count of each type of hardware that has been successfully sorted, providing an at-a-glance overview of the inventory.

## 🕹️ How to Use

Operating the application is straightforward:

1.  **Launch the Application**: Open the application in your browser. You will be greeted with the main dashboard. The system is initially idle.
2.  **Start Sorting**: Click the **"Start Sorting"** button located at the top-right of the "Camera Feed" panel.
3.  **Monitor the Process**:
    -   Watch as new hardware items appear in the camera feed.
    -   Observe the "Identification & Sorting" panel update with the AI's findings for each item.
    -   See the "Sorting Log" populate with new entries in real-time.
    -   Switch to the "Inventory" tab to see the chart update as more items are categorized.
4.  **Stop Sorting**: Click the **"Stop Sorting"** button to pause the operation. The system will finish processing the current item and then halt.

## 🛠️ Technical Stack

This application is built with a modern, robust, and scalable tech stack:

-   **Frontend**:
    -   [Next.js](https://nextjs.org/): A React framework for building server-rendered and static web applications.
    -   [React](https://react.dev/): A JavaScript library for building user interfaces.
    -   [TypeScript](https://www.typescriptlang.org/): For type-safe JavaScript development.
-   **AI & Backend**:
    -   [Genkit](https://firebase.google.com/docs/genkit): An open-source framework from Google for building AI-powered applications. It orchestrates the calls to the generative models.
    -   [Google AI Models](https://ai.google/): Multimodal models used for image analysis and instruction generation.
-   **UI & Styling**:
    -   [ShadCN/UI](https://ui.shadcn.com/): A collection of beautifully designed, accessible, and reusable components.
    -   [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapid UI development.
    -   [Lucide React](https://lucide.dev/): A library of simply designed, beautiful icons.
    -   [Recharts](https://recharts.org/): A composable charting library built on React components.

## 🏁 Getting Started (for Developers)

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18 or newer)
-   npm or a compatible package manager
-   A `.env` file with your `GEMINI_API_KEY`.

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/your-repo/sortmaster.git
    cd sortmaster
    ```
2.  Install NPM packages:
    ```sh
    npm install
    ```
3. Create a `.env.local` file in the root of the project and add your Google AI API key:
   ```
   GEMINI_API_KEY=YOUR_API_KEY
   ```
4. Run the development server:
   ```sh
   npm run dev
   ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## 🤝 Contributing

Contributions are welcome! This document will be updated as the application evolves. If you have suggestions for new features or improvements, feel free to open an issue or submit a pull request.
