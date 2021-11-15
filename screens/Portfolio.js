import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image
} from 'react-native';
import { MainLayout } from '.';
import { useDispatch, useSelector  } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native ';
import { getHoldings } from '../store/market/marketAction';
import { BalanceInfo, Chart } from '../components';
import { COLORS, FONTS, SIZES } from '../constants';
// import {} from 

const Portfolio = () => {
    const dispatch = useDispatch();
    const { myHoldings } = useSelector(state => state.marketReducer);

    return (
        <MainLayout>
            <View>
                <Text>Portfolio</Text>
            </View>
        </MainLayout>
    )
}

export default Portfolio;