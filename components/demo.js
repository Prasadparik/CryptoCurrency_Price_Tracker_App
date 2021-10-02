import React, {useState, useEffect} from 'react'
import {Dimensions, View, Text, StyleSheet,
        ScrollView, Image
 } from 'react-native';


export const {width: SIZE} = Dimensions.get('window');
import {ChartDot, ChartPath, ChartPathProvider, ChartYLabel} from '@rainbow-me/animated-charts';
import {useSharedValue} from 'react-native-reanimated';

const Chart = ({currentPrice, logoUrl, name, priceChangePercentage7d, sparkline, high, low}) => {
const sb = '#6a5acd';

const latestPrice = useSharedValue(currentPrice);
const [chartDone, setChartDone] = useState(false);

useEffect(() => {
  latestPrice.value = currentPrice;

  setTimeout(()=>{
    setChartDone(true);
  }, 0)

}, [currentPrice])

const formatUSD = value => {
  'worklet';
  if(value === '') {
    return `$ ${latestPrice.value.toLocaleString('en-US',  {currency: 'USD' })}`;
  }

  const formatedPrice = `$${parseFloat(value).toFixed(2)}`

  return formatedPrice;

};

	return (
      <ChartPathProvider data={{ points: sparkline, smoothingStrategy: 'bezier' }}>
    <ScrollView>

        <View style={styles.leftWrapper}>
          <Image source={{uri: logoUrl}} style={styles.image} />
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{name}</Text>

          <ChartYLabel format={formatUSD}  style={styles.Currentprice} />
        {/*  <Text style={styles.Currentprice}>$ {currentPrice.toLocaleString('en-US',  {currency: 'USD' })}</Text>  */ }

          </View>
        </View>
{   chartDone ? 
   ( <View style={styles.chartbox}>
      <ChartPath  height={SIZE / 2.05} width={SIZE / 1.08} stroke={sb} />
      <ChartDot  style={{ backgroundColor: '#6a5acd' }} />
    </View>)
    : null}

<Text style={styles.hL24h}> 24 Hours Report </Text>

{/* HIGH*/}
  <View style={styles.HighLowWrapper} >
  <View>
          <Text style={styles.HighLowText}>High</Text>
  </View>

  <View>
          <Text style={styles.todayHigh}>$ {high.toLocaleString('en-US',  {currency: 'USD' })}</Text>
  </View>

  </View>
  
      <View style={styles.divider} />

{/* LOW*/}
  <View style={styles.HighLowWrapper} >
  <View>
          <Text style={styles.HighLowText}>Low</Text>
  </View>

  <View >
          <Text style={styles.todayLow}>$ {low.toLocaleString('en-US',  {currency: 'USD' })}</Text>
  </View>

  </View>

   
  
</ScrollView>
    </ChartPathProvider>
	)
}



const styles = StyleSheet.create({
  chartbox: {
    backgroundColor: '#222',
    height: 230,
     borderRadius: 10,
    //  marginLeft: 10,
    //  marginRight: 10,
    //  borderWidth: 10,
    //  borderColor: '#ccc',
     marginTop: 20,
     marginBottom: 10,
  },
  title: {
    fontSize: 18,
  },
  image: {
    height: 35,
    width: 35,
  },
   leftWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
    titleWrapper: {
    marginLeft: 8,
  },
  Currentprice:{
    fontSize: 22,
    color: "black",
    fontWeight: "bold",
    opacity: 1,
  },
  HighLowWrapper: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
  },
  todayHigh: {
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    color: "#32CD32",
    fontSize: 16,
      margin: 3,
  //  fontWeight: "bold",

  },
  todayLow: {
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    color: "#FF6347",
    fontSize: 16,
    margin: 3,

  //  fontWeight: "bold",
  },
  hL24h: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

   divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ccc',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  HighLowText: {
    paddingLeft: 20,
  }

});

export default Chart;
