import React, {useState, useEffect} from 'react'
import {Dimensions, View, Text, StyleSheet,
        ScrollView, Image
 } from 'react-native';


export const {width: SIZE} = Dimensions.get('window');
import {ChartDot, ChartPath, ChartPathProvider, ChartYLabel} from '@rainbow-me/animated-charts';

const Chart = ({currentPrice, logoUrl, name, priceChangePercentage7d, sparkline, high, low}) => {

	return (
    <View style={styles.chartWrapper}>

    <View style={styles.titleWrapper}>

     <View style={styles.upperTitles}>
       <View style={styles.upperLeftTitles}>
       <Image source={{ uri: logoUrl}} style={styles.image} />
       <Text style={styles.subtitle}>. {name} </Text>
       </View>
       <Text style={styles.subtitle}> 7d </Text>
     </View>

     <View style={styles.lowerTitles}>
     <Text> $ {currentPrice.toLocaleString('en-US',  {currency: 'USD' })} </Text>
     <Text>{priceChangePercentage7d} % </Text>
     </View>

    </View>
    
    </View>
	)
}



const styles = StyleSheet.create({


});

export default Chart;
