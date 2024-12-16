// Graph.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { EmotionData } from '../../contexts/EmotionData';
import { AnalysisData } from '../../types/datatype';

type RadarChartProps = {
  analysisData: AnalysisData;
};

const Graph = ({ analysisData }: RadarChartProps) => {
  const labels = EmotionData.map(ed => ed.name);
  const data = EmotionData.map(ed => Math.round(analysisData[ed.feel as keyof AnalysisData] * 100));

  const chartHtml = `
    <html>
      <head>
      <style>
        body { margin: 0; overflow: hidden; }
        #chart { width: 100%; height: 100%; }
      </style>
        <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
      </head>
      <body>
        <div id="chart"></div>
        <script>
          var data = [{
            type: 'scatterpolar',
            r: [${data.join(',')}],
            theta: [${labels.map(label => `"${label}"`).join(',')}],
            fill: 'toself',
            fillcolor: 'rgba(254, 139, 139, 0.65)',
            line: {
              color: '#FE8B8B',
            }
          }];
          
          var layout = {
            height: 800,
            // margin: {
            //   t: 150,
            //   l: 50,
            //   r: 50,
            //   b: 50,
            // },
            polar: {
              // 방사축
              radialaxis: {
                visible: true,
                range: [0, 90],
                showticklabels: false,
                showline: false,
                ticklen: 0,
              },
              // 각축
              angularaxis: { 
                color: '#FE8B8B',   // 선 색깔
                ticklen: 0,
                tickfont: {         // 폰트
                  color: '#FE8B8B',
                  size: 30,
                },
              },
              gridshape: 'linear',
            },
            showlegend: false,
            paper_bgcolor: 'rgba(0, 0, 0, 0)',
          };      

          var config = { 
            displayModeBar: false,
            staticPlot: true,
            doubleClick: 'reset'
           };

          Plotly.newPlot('chart', data, layout, config);
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView originWhitelist={['*']} source={{ html: chartHtml }} style={styles.webView} />
      <View style={styles.row}>
        {EmotionData.slice(0, 3).map((ed, index) => (
          <Text key={index} style={styles.emotionText}>
            {ed.name}: {data[index]}%
          </Text>
        ))}
      </View>
      <View style={styles.row}>
        {EmotionData.slice(3, 6).map((ed, index) => (
          <Text key={index} style={styles.emotionText}>
            {ed.name}: {data[index + 3]}%
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webView: {
    height: 280,
    width: 280,
    backgroundColor: 'transparent',
  },
  emotionText: {
    fontSize: 15,
    marginTop: 10,
    marginHorizontal: 5, // 좌우 간격을 조정하기 위한 스타일
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

export default Graph;
