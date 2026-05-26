export type ViewerProjectId = "micro-turbojet";

export interface ViewerProjectConfig {
  id: ViewerProjectId;
  label: string;
  code: {
    publicPath: string;
    tabName: string;
    windowTitle: string;
    fileTree: string[];
  };
  cad: {
    modelPath: string;
    windowTitle: string;
    historyTree: string[];
  };
  fea: {
    modelPath: string;
    windowTitle: string;
    outlineTree: string[];
    stressMaxMpa: number;
    stressOpMpa: number;
  };
}

export const VIEWER_PROJECTS: Record<ViewerProjectId, ViewerProjectConfig> = {
  "micro-turbojet": {
    id: "micro-turbojet",
    label: "Micro-Turbojet Propulsion",
    code: {
      publicPath: "/projects/micro-turbojet/cycle_solver.py",
      tabName: "cycle_solver.py",
      windowTitle: "VS Code • micro-turbojet-cycle-solver",
      fileTree: [
        "micro-turbojet/",
        "  solver/",
        "    cycle_solver.py",
        "    compressor.py",
        "    turbine.py",
        "  data/",
        "    thermo_data.csv",
      ],
    },
    cad: {
      modelPath: "/models/impeller.glb",
      windowTitle: "Siemens NX • Micro-Turbojet Impeller",
      historyTree: [
        "Part Navigator",
        "  Datum Coordinate System",
        "  Sketch_001",
        "  Revolve_001",
        "  Parametric Impeller Assembly",
        "    Hub_Body",
        "    Bladegen_Surface",
        "    Shroud_Profile",
      ],
    },
    fea: {
      modelPath: "/models/impeller_deformed.glb",
      windowTitle: "Ansys Mechanical • Micro-Turbojet Stress",
      outlineTree: [
        "Model",
        "  Geometry",
        "  Mesh",
        "  Static Structural",
        "    Fixed Support",
        "    Centrifugal Load",
        "    Solution",
        "      Total Deformation",
        "      Equivalent Stress",
      ],
      stressMaxMpa: 880,
      stressOpMpa: 622,
    },
  },
};

const DEFAULT_PROJECT_ID: ViewerProjectId = "micro-turbojet";

export function resolveViewerProject(
  projectId: string | null | undefined
): ViewerProjectConfig {
  if (projectId && projectId in VIEWER_PROJECTS) {
    return VIEWER_PROJECTS[projectId as ViewerProjectId];
  }
  return VIEWER_PROJECTS[DEFAULT_PROJECT_ID];
}

export const viewerHref = {
  code: (projectId: ViewerProjectId = DEFAULT_PROJECT_ID) =>
    `/wiki/code-viewer?project=${projectId}`,
  cad: (projectId: ViewerProjectId = DEFAULT_PROJECT_ID) =>
    `/wiki/cad-viewer?project=${projectId}`,
  fea: (projectId: ViewerProjectId = DEFAULT_PROJECT_ID) =>
    `/wiki/fea-viewer?project=${projectId}`,
};

export const MICRO_TURBOJET_PROJECT_ID: ViewerProjectId = "micro-turbojet";
