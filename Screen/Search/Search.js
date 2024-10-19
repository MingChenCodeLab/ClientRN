import React, { useEffect, useState ,useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, FlatList, ToastAndroid } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../Services/auth.services";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
const exampleData = [
  { id: 1, name: "Product 1" },
  { id: 2, name: "Product 2" },
  { id: 3, name: "Product 3" },
  // Add more example items as needed
];

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const { SearchProduct } = useAuth();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const iconclicksearch = async (searchQuery) => {
    SearchProduct(searchQuery).then((data) => {
      setFilteredResults(data);
    });
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    try {
      SearchProduct(query).then((data) => {
        if(data.length === 0){
          ToastAndroid.show("Không tìm thấy sản phẩm", ToastAndroid.SHORT);
          setFilteredResults([]);
          return;
        }
        setFilteredResults(data);
       
      });
    } catch (error) {
      console.error('Invalid regex pattern:', error.message);
      setFilteredResults([]);
    }
  };

  const handleItemClick = (item) => {
    console.log('Clicked item:', item.product_id);
    navigation.navigate('ProductDetail', { product: item });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tìm kiếm</Text>
        <TouchableOpacity onPress={() => setSearchQuery('')}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm giày cho riêng bạn"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity onPress={() => iconclicksearch(searchQuery)}>
          <Ionicons name="mic" size={20} color="blue" style={styles.micIcon} />
        </TouchableOpacity>
      </View>
      
    
      <View style={styles.itemsearch}>
     
        {searchQuery !== '' && (
          <FlatList
            data={filteredResults}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleItemClick(item)}>
                <View style={styles.resultItem}>
                  <Text>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
            style={{ maxHeight: 200 }}
          />
        )}
      </View>
      <Text style={styles.sectionTitle}>Giày đã tìm</Text>
      <ScrollView>
        {['New Shoes', 'Nike Top Shoes', 'Nike Air Force', 'Shoes', 'Snakers Nike Shoes', 'Regular Shoes',].map((item, index) => (
          <View key={index} style={styles.listItem}>
            <Ionicons name="time-outline" size={20} color="gray" />
            <Text style={styles.listItemText}>{item}</Text>
            <TouchableOpacity style={styles.removehistorysearch}>
              <Ionicons name="close-circle" size={20} color="red" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    fontSize: 16,
    color: 'blue',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    margin: 10,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  micIcon: {
    marginLeft: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',

  },
  listItemText: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default SearchScreen;