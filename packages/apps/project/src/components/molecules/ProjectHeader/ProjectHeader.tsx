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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  Badge,
  LabelText,
  Text,
  checkNullString,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {Project} from '../../../types/';

interface ProjectHeaderProps {
  project: any;
}

const ProjectHeader = ({project}: ProjectHeaderProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const {base: baseConfig} = useSelector(state => state.appConfig);
  const {user} = useSelector(state => state.user);

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text writingType="title">{project?.name}</Text>
        <Badge
          title={Project.getStatus(project?.projectStatus?.id, I18n)}
          color={Project.getStatusColor(project?.projectStatus?.id, Colors)}
        />
      </View>
      <View style={styles.rowContainer}>
        {baseConfig?.enableMultiCompany && user?.companySet?.length > 1 && (
          <LabelText
            iconName="building-fill"
            size={16}
            title={project?.company?.name}
            textStyle={styles.labelText}
          />
        )}
        {project?.isBusinessProject && (
          <Badge title={I18n.t('Project_Buisness')} color={Colors.infoColor} />
        )}
      </View>
      <View style={styles.rowContainer}>
        <LabelText
          iconName="pin-angle-fill"
          size={16}
          title={project?.assignedTo?.fullName}
          textStyle={styles.labelText}
        />
      </View>
      {!checkNullString(project?.parentProject?.fullName) && (
        <LabelText
          iconName="diagram-3-fill"
          size={16}
          title={project?.parentProject?.fullName}
          textStyle={styles.labelText}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginBottom: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  labelText: {
    fontSize: 16,
  },
});

export default ProjectHeader;
