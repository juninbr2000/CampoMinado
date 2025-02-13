import React from 'react';
import {View, StyleSheet} from 'react-native';
import Field from './Field';


const MineField = (props) => {
    const rows = props.board.map((row, r) => {
        const colunms = row.map((field, c) => {
            return <Field {...field} key={c} onOpen={()=> props.onOpenField(r, c)} onSelect={(e) => props.onSelectField(r, c)}/>
        })
        return <View key={r} style={{flexDirection: 'row'}}>{colunms}</View>
    });

    return <View style={styles.container}>{rows}</View>
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEE'
    }
})

export default MineField;