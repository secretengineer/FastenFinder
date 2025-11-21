# FastenFinder: The Ultimate Hardware Sorting System

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black.svg?style=for-the-badge&logo=nextdotjs" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-18-blue.svg?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue.svg?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Genkit-1.x-orange.svg?style=for-the-badge&logo=google-cloud" alt="Genkit" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-38B2AC.svg?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
</p>

<p align="center">
  A sophisticated, AI-driven application designed to automate the identification and sorting of small hardware components. FastenFinder evolves the concept of industrial sorting by combining the reasoning power of Generative AI with the precision of computer vision.
</p>

---

## 📖 Table of Contents

- [🚀 Introduction](#-introduction)
- [🏗️ Hardware Architecture](#%EF%B8%8F-hardware-architecture)
- [⚙️ How It Works](#%EF%B8%8F-how-it-works)
- [🖥️ Application Overview](#%EF%B8%8F-application-overview)
  - [1. Camera Feed](#1-camera-feed)
  - [2. Identification & Sorting Panel](#2-identification--sorting-panel)
  - [3. Sorting Log & Inventory Tabs](#3-sorting-log--inventory-tabs)
- [🕹️ How to Use](#%EF%B8%8F-how-to-use)
- [🛠️ Technical Stack](#%EF%B8%8F-technical-stack)
- [🗺️ Roadmap](#%EF%B8%8F-roadmap)
- [🏁 Getting Started (for Developers)](#-getting-started-for-developers)
- [🤝 Contributing](#-contributing)

---

## 🚀 Introduction

**FastenFinder** is an intelligent control system for an automated industrial sorting line. It leverages the power of generative AI to analyze a video stream of hardware parts and make complex decisions about their categorization.

While currently operating in a software-only simulation mode, this project is architected to drive a physical conveyor system. It solves the "bucket of random hardware" problem by not just classifying families of parts (screws vs. nails) but by aiming to distinguish subtle characteristics (thread pitch, length, head type) to automate inventory return.

## 🏗️ Hardware Architecture

To achieve high-precision sorting, FastenFinder is designed around a three-tier architecture:

1.  **Physical Layer**:
    *   **Conveyor Belt**: Singulates items from a bulk hopper.
    *   **Camera System**: High-resolution capture with calibrated lighting to minimize shadows.
    *   **Sorting Diverters**: Servo-controlled gates to direct items into specific bins.

2.  **Edge Processing Layer (Planned)**:
    *   **Hybrid Vision**: Using OpenCV for metrology (precise millimeter measurement) and rapid object detection.
    *   **Trigger Logic**: Motion-based interrupts to capture images only when an item is centered.

3.  **Cloud Intelligence Layer**:
    *   **Genkit & Gemini**: Handles the complex reasoning for ambiguous items and generates natural language sorting instructions.

## ⚙️ How It Works

The application's workflow is a seamless integration of frontend components and powerful backend AI models, orchestrated by Genkit.

1.  **Item Presentation**: The system simulates a conveyor belt by presenting images of hardware items one by one in the "Camera Feed" panel. (Future: Real camera feed integration via WebRTC).
2.  **AI Identification**: Each image is captured and sent to a Genkit flow powered by a multimodal AI model. The model analyzes the image to identify the type of hardware (e.g., "screw", "bolt").
3.  **Instruction Generation**: Once an item is identified, the information is passed to a second Genkit flow. This flow determines the appropriate bin for the item and generates a clear, human-readable command for the sorting robot.
4.  **Dashboard Update**: All results—the identification, confidence score, and sorting instruction—are instantly displayed in the "Identification & Sorting" panel.
5.  **Logging & Tracking**: Every sorting action is recorded in the "Sorting Log" with a timestamp and a preview image. The "Inventory" tab is updated to keep a running count of each type of hardware.

## 🖥️ Application Overview

The main interface is a comprehensive dashboard divided into several key components:

### 1. Camera Feed

This is the central monitoring station.
-   **Live View**: Displays the items as they pass through the system.
-   **Start/Stop Control**: A toggle button allows you to start and stop the sorting process.
-   **Status Indicator**: An animated overlay shows when the system is actively scanning and processing an item.

### 2. Identification & Sorting Panel

This panel displays the real-time results from the AI analysis.
-   **Identified Hardware**: Shows the name of the identified item (e.g., "Washer") next to a corresponding icon.
-   **Confidence Score**: A progress bar and percentage value indicate how certain the AI is about its identification.
-   **Assigned Bin**: The designated bin for the sorted item.
-   **Robot Instruction**: The specific command generated for the sorting robot.

### 3. Sorting Log & Inventory Tabs

Located at the bottom of the dashboard, these tabs provide historical and aggregate data.
-   **Sorting Log**: A real-time, scrollable table of every item that has been processed.
-   **Inventory**: A bar chart that visualizes the total count of each type of hardware.

## 🕹️ How to Use

Operating the application is straightforward:

1.  **Launch the Application**: Open the application in your browser.
2.  **Start Sorting**: Click the **"Start Sorting"** button located at the top-right of the "Camera Feed" panel.
3.  **Monitor the Process**: Watch as new hardware items appear and are categorized in real-time.
4.  **Stop Sorting**: Click the **"Stop Sorting"** button to pause the operation.

## 🛠️ Technical Stack

This application is built with a modern, robust, and scalable tech stack:

-   **Frontend**:
    -   [Next.js](https://nextjs.org/): A React framework for building server-rendered and static web applications.
    -   [React](https://react.dev/): A JavaScript library for building user interfaces.
    -   [TypeScript](https://www.typescriptlang.org/): For type-safe JavaScript development.
-   **AI & Backend**:
    -   [Genkit](https://firebase.google.com/docs/genkit): An open-source framework from Google for building AI-powered applications.
    -   [Google AI Models](https://ai.google/): Multimodal models used for image analysis.
-   **Future Integrations**:
    -   **OpenCV**: For precise measurement and object bounding.
    -   **Web Serial API**: For direct communication with conveyor microcontrollers.

## 🗺️ Roadmap

The goal of FastenFinder is to evolve from a simulation to a physical sorting controller. The development roadmap includes:

- [ ] **Hybrid Vision System**: Integrating OpenCV for precise metrology (pixel-to-mm sizing) alongside Gen AI for classification.
- [ ] **Hardware Interface**: Support for Web Serial API to communicate with microcontrollers (Arduino/ESP32) for controlling conveyor belts and sorting servos.
- [ ] **Trigger Logic**: Implementing motion-detection or sensor-based triggers to capture images only when hardware is present.
- [ ] **Dataset Collection**: A dedicated UI mode for rapidly capturing and labeling physical hardware to fine-tune local models.

## 🏁 Getting Started (for Developers)

To get a local copy of the control software running:

### Prerequisites

-   Node.js (v18 or newer)
-   npm or a compatible package manager
-   A `.env` file with your `GEMINI_API_KEY`.

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/secretengineer/FastenFinder.git
    cd FastenFinder
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

Contributions are welcome! If you have suggestions for new features or improvements, feel free to open an issue or submit a pull request.