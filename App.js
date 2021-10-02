import React, { useRef, useMemo, useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
  View,
} from "react-native";

// Components
import ListItem from "./components/ListItem";
import Chart from "./components/Chart";
import Demo from "./components/demo";

import { SAMPLE_DATA } from "./assets/data/sampleData";
import { getMarketData } from "./services/cryptoService";

// Bottom Sheet
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

const App = () => {
  const [data, setData] = useState([]);
  const [selectedCoinData, setSelectedCoinData] = useState(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      const MarketData = await getMarketData();
      setData(MarketData);
    };
    fetchMarketData();
  }, []);

  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["65%"], []);

  // Sheet Open Function
  const openModal = (item) => {
    setSelectedCoinData(item);
    bottomSheetModalRef.current?.present();
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView />
      <StatusBar />
      <ScrollView style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.largeTitle}>Markets</Text>
        </View>

        <View style={styles.divider} />

        <FlatList
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={({ item }) => (
            <ListItem
              name={item.name}
              symbol={item.symbol}
              currentPrice={item.current_price}
              priceChangePercentage7d={
                item.price_change_percentage_7d_in_currency
              }
              logoUrl={item.image}
              onPress={() => openModal(item)}
            />
          )}
        />
      </ScrollView>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomSheetS}
      >
        <View style={styles.contentContainer}>
          {selectedCoinData ? (
            <Demo
              currentPrice={selectedCoinData.current_price}
              logoUrl={selectedCoinData.image}
              name={selectedCoinData.name}
              priceChangePercentage7d={
                selectedCoinData.price_change_percentage_7d_in_currency
              }
              sparkline={selectedCoinData.sparkline_in_7d.price}
              high={selectedCoinData.high_24h}
              low={selectedCoinData.low_24h}
            />
          ) : null}
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  titleWrapper: {
    marginTop: 30,
    paddingHorizontal: 16,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#ccc",
    marginHorizontal: 16,
    marginTop: 16,
  },
  bottomSheetS: {
    borderRadius: 10,
    borderTopColor: "#222",
    padding: 14,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default App;
