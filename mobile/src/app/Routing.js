import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import i18n from './i18n';
import {
  AddCategory,
  AddOperation,
  CategoryList,
  Loader,
  Logo,
  OperationList,
  MenuBottom,
  Settings,
} from './components';

const topStackNavigationOptions = {
  headerStyle: {
    backgroundColor: '#fff',
  },
  headerTintColor: '#000',
  headerTitleStyle: {
    fontWeight: 'bold'
  },
  headerLeft: <Logo />,
  headerTitle: '0.01'
};

const OperationListStack = createStackNavigator(
  {
    OperationList: OperationList,
  },
  {
    navigationOptions: {
      ...topStackNavigationOptions,
      headerTitle: i18n.t('title.operationList')
    }
  }
);

const SettingsStack = createStackNavigator(
  {
    Settings: Settings
  },
  {
    navigationOptions: {
      ...topStackNavigationOptions,
      headerTitle: i18n.t('title.settings')
    }
  }
);

const CategoryListStack = createStackNavigator(
  {
    CategoryList: CategoryList
  },
  {
    navigationOptions: {
      ...topStackNavigationOptions,
      headerTitle: i18n.t('title.categoryList')
    }
  }
);

const AddOperationStack = createStackNavigator(
  {
    AddOperation: AddOperation
  },
  {
    navigationOptions: {
      ...topStackNavigationOptions,
      headerTitle: i18n.t('title.addOperation')
    }
  }
);

const AddCategoryStack = createStackNavigator(
  {
    AddCategory: AddCategory
  },
  {
    navigationOptions: {
      ...topStackNavigationOptions,
      headerTitle: i18n.t('title.addCategory')
    }
  }
);

// const MenuStack = createStackNavigator(
//   {
//     Menu: Menu
//   },
//   {
//     navigationOptions: {
//       ...topStackNavigationOptions,
//       title: i18n.t('title.menu')
//     }
//   }
// );

const AppStack = createBottomTabNavigator(
  {
    OperationList: OperationListStack,
    AddOperation: AddOperationStack,
    AddCategory: AddCategoryStack,
    CategoryList: CategoryListStack,
    Settings: SettingsStack,
  },
  {
    navigationOptions: ({ navigation }) => ({
      // title: getBottomStackTitle(navigation.state.routeName),
      tabBarOnPress: ({navigation, defaultHandler}) => {
        if (navigation.state.routeName === 'Menu') {
          // store.dispatch({type: CommonTypes.TOGGLE_MENU});
          return;
        }

        defaultHandler();
      },
      tabBarComponent: props => <MenuBottom props={props}/>,
    }),
    tabBarOptions: {
      activeTintColor: '#000',
      inactiveTintColor: '#bbb',
      showLabel: true,
    },
  },
);

const RootStack = createSwitchNavigator(
  {
    Loader: Loader,
    App: AppStack,
  },
  {
    initialRouteName: 'Loader',
  }
);

export default RootStack;
