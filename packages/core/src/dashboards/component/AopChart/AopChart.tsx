/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {Chart, BarChart, LineChart, PieChart} from '@axelor/aos-mobile-ui';
import {
  fetchActionView,
  fetchChartDataset,
  fetchTypeChart,
  getChartParameter,
} from '../../../api/chart-api';

interface AopChartProps {
  actionViewName: string;
}

const AopChart = ({actionViewName}: AopChartProps) => {
  const [chart, setChart] = useState({type: '', dataset: [], title: ''});

  useEffect(() => {
    const fetchChartData = async () => {
      const result = {type: '', dataset: [], title: ''};

      try {
        const actionViewResponse = await fetchActionView({
          actionViewName: actionViewName,
        });

        const context = actionViewResponse?.data?.data[0]?.view?.context;
        const chartName = actionViewResponse?.data?.data[0]?.view.views[0].name;

        const typeResponse = await fetchTypeChart({chartName: chartName});
        result.title = typeResponse?.data?.data?.title;
        result.type = typeResponse?.data?.data?.series[0].type;
        const onInit = typeResponse?.data?.data?.onInit;

        let parameter = null;
        if (onInit) {
          const paramResponse = await getChartParameter({
            chartName,
            action: onInit,
            context: context,
          });
          parameter = paramResponse?.data?.data[0].values;
        }

        const datasetResponse = await fetchChartDataset({
          chartName,
          parameter,
          context,
        });
        result.dataset = datasetResponse?.data?.data?.dataset;
      } catch (error) {
        setChart({type: '', dataset: [], title: ''});
      }

      setChart(result);
    };

    fetchChartData();
  }, [actionViewName]);

  const BarChartRender = (datasets, title) => {
    return (
      <BarChart
        datasets={datasets}
        widthGraph={Dimensions.get('window').width}
        title={title}
      />
    );
  };

  const LineChartRender = (datasets, title) => {
    return (
      <LineChart
        datasets={datasets}
        widthGraph={Dimensions.get('window').width}
        title={title}
      />
    );
  };

  const PieChartRender = (datasets, type, title) => {
    return (
      <PieChart
        datasets={datasets[0]}
        widthGraph={Dimensions.get('window').width}
        donut={type === Chart.chartType.donut}
        title={title}
      />
    );
  };

  const renderChar = (type, dataset, title) => {
    switch (type) {
      case Chart.chartType.bar:
        return BarChartRender(dataset, title);

      case Chart.chartType.pie:
      case Chart.chartType.donut:
        return PieChartRender(dataset, type, title);

      case Chart.chartType.line:
        return LineChartRender(dataset, title);

      default:
        return null;
    }
  };

  const transformData = data => {
    const sample = data[0];
    let valueKey = '';
    let labelKey = '';

    Object.keys(sample).forEach(key => {
      const value = sample[key];
      if (!isNaN(parseFloat(value))) {
        valueKey = key;
      } else {
        labelKey = key;
      }
    });

    return data.map(item => ({
      label: item[labelKey],
      value: parseFloat(item[valueKey]) || 0,
    }));
  };

  if (chart.dataset?.length <= 0) {
    return null;
  }

  return (
    <View>
      {renderChar(chart.type, [transformData(chart.dataset)], chart.title)}
    </View>
  );
};

export default AopChart;
