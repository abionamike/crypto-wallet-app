import React from "react";
import {
    TouchableOpacity,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { Home, Portfolio, Market, Profile } from "../screens"
import { TabIcon } from '../components';
import { COLORS, icons } from "../constants"
import { useDispatch, useSelector } from 'react-redux';
import { setTradeModalVisibility } from "../store/tab/tabActions";

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ children, onPress }) => {    
    return (
        <TouchableOpacity
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onPress={onPress}
        >
            {children}
        </TouchableOpacity>
    )
}

const Tabs = () => {
    const dispatch = useDispatch();
    const isModalVisible = useSelector(state => state.tabReducer.isTradeModalVisible);

    const tradeTabOnClick = () => {
        dispatch(setTradeModalVisibility(!isModalVisible));
    }

    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    height: 140,
                    backgroundColor: COLORS.primary,
                    borderTopColor: "transparent",
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if(!isModalVisible) {
                            return (
                                <TabIcon focused={focused} icon={icons.home} label="Home" />
                            )
                        }
                    }
                }}
                listeners={{
                    tabPress: (e) => {
                        if(isModalVisible) {
                            e.preventDefault();
                        }
                    }
                }}
            />
            <Tab.Screen
                name="Portfolio"
                component={Portfolio}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if(!isModalVisible) {
                            return (
                                <TabIcon focused={focused} icon={icons.briefcase} label="Portfolio" />
                            )
                        }
                    }
                }}
                listeners={{
                    tabPress: (e) => {
                        if(isModalVisible) {
                            e.preventDefault();
                        }
                    }
                }}
            />
            <Tab.Screen
                name="Trade"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TabIcon 
                                focused={focused} 
                                icon={isModalVisible ? icons.close : icons.trade} 
                                iconStyle={isModalVisible ? { height: 15, width: 15 } : null}
                                label="Trade" 
                                isTrade={true} 
                            />
                        )
                    },
                    tabBarButton: (props) => {
                        return (
                            <TabBarCustomButton 
                                {...props}
                                onPress={tradeTabOnClick}
                            /> 
                        )
                    }
                }}
            />
            <Tab.Screen
                name="Market"
                component={Market}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if(!isModalVisible) {
                            return (
                                <TabIcon focused={focused} icon={icons.market} label="Market" />
                            )
                        }
                    }
                }}
                listeners={{
                    tabPress: (e) => {
                        if(isModalVisible) {
                            e.preventDefault();
                        }
                    }
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if(!isModalVisible) {
                            return (
                                <TabIcon focused={focused} icon={icons.profile} label="Profile" />
                            )
                        }
                    }
                }}
                listeners={{
                    tabPress: (e) => {
                        if(isModalVisible) {
                            e.preventDefault();
                        }
                    }
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;