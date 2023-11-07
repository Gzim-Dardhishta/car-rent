export const SparklineAreaData = [
    { x: 1, yval: 2 },
    { x: 2, yval: 6 },
    { x: 3, yval: 8 },
    { x: 4, yval: 5 },
    { x: 5, yval: 10 },
];

export const areaPrimaryXAxis = {
    valueType: "DateTime",
    labelFormat: "y",
    majorGridLines: { width: 0 },
    intervalType: "Years",
    edgeLabelPlacement: "Shift",
    labelStyle: { color: "gray" },
};

export const stackedChartData = [
    [
      { x: "Jan", y: 111.1 },
      { x: "Feb", y: 127.3 },
      { x: "Mar", y: 143.4 },
      { x: "Apr", y: 159.9 },
      { x: "May", y: 159.9 },
      { x: "Jun", y: 159.9 },
      { x: "July", y: 159.9 },
    ],
    [
      { x: "Jan", y: 111.1 },
      { x: "Feb", y: 127.3 },
      { x: "Mar", y: 143.4 },
      { x: "Apr", y: 159.9 },
      { x: "May", y: 159.9 },
      { x: "Jun", y: 159.9 },
      { x: "July", y: 159.9 },
    ],
  ];

export const stackedCustomSeries = [
    {
      dataSource: stackedChartData[0],
      xName: "x",
      yName: "y",
      name: "Budget",
      type: "StackingColumn",
      background: "blue",
    },
  
    {
      dataSource: stackedChartData[1],
      xName: "x",
      yName: "y",
      name: "Expense",
      type: "StackingColumn",
      background: "red",
    },
  ];
  
  // Stacked primary x-axis
  export const stackedPrimaryXAxis = {
    majorGridLines: { width: 0 },
    minorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    interval: 1,
    lineStyle: { width: 0 },
    labelIntersectAction: "Rotate45",
    valueType: "Category",
  };
  
  // Stacked primary y-axis
  export const stackedPrimaryYAxis = {
    lineStyle: { width: 0 },
    minimum: 100,
    maximum: 400,
    interval: 100,
    majorTickLines: { width: 0 },
    majorGridLines: { width: 1 },
    minorGridLines: { width: 1 },
    minorTickLines: { width: 0 },
    labelFormat: "{value}",
  };