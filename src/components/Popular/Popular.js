import React, { useContext, useState } from 'react';
import { View, StyleSheet, ScrollView } from "react-native";
import Header from '../Header/Header';
import { SearchBar } from "react-native-elements";
import Items from './Items';

const Popular = ({ navigation }) => {
    const [search, serSearch] = useState("");
    
    const updateSearch = (search) => serSearch(search);
   
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <Header navigation={navigation} component="Popular" />
            <ScrollView>
                <View style={styles.mainView}>
                    <SearchBar
                        placeholder="Search"
                        onChangeText={updateSearch}
                        value={search}
                        clearIcon={true}
                        showLoading={true}
                        containerStyle={{
                            backgroundColor: "white", borderRadius: 50,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.20,
                            shadowRadius: 1.41,
                            elevation: 2,
                            paddingVertical: 0
                        }}
                        inputContainerStyle={{ backgroundColor: "white", borderRadius: 50 }}
                        leftIconContainerStyle={{ borderColor: "white" }}
                        lightTheme={true}
                    />
                </View>
                <Items navigation={navigation} />
            </ScrollView>
        </View>
    )
}

export default Popular;

const styles = StyleSheet.create({
    mainView: {
        paddingHorizontal: 15,
        marginTop: 15,
    },
})