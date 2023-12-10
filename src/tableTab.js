import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View,
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Modal 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const TableTab = () => {

  const [data, setData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const navigation = useNavigation();

  const navigateToAddPage = () => {
    navigation.navigate('MainTab');
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const existingStudent = await AsyncStorage.getItem('students');
        const students = existingStudent ? JSON.parse(existingStudent) : [];
        setData(students);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleRowClick = (student) => {
    setSelectedStudent(student);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
  };

  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={{ flex: 0.5, minWidth: 30 }}>ID</Text>
      <Text style={{ flex: 1, minWidth: 150 }}>Name</Text>
      <Text style={{ flex: 0.5, minWidth: 70 }}>Course</Text>
      <Text style={{ flex: 1, minWidth: 70 }}>Username</Text>
    </View>
  );

  const renderTableRow = (student) => (
    <TouchableOpacity
      key={student.id}
      style={styles.tableData}
      onPress={() => handleRowClick(student)}
    >
      <Text style={{ flex: 0.5, minWidth: 30 }}>{student.id}</Text>
      <Text style={{ flex: 1, minWidth: 150 }}>{`${student.FirstName} ${student.LastName}`}</Text>
      <Text style={{ flex: 0.5, minWidth: 70 }}>{student.Course}</Text>
      <Text style={{ flex: 1, minWidth: 70 }}>{student.Username}</Text>
    </TouchableOpacity>
  );

  const renderTable = () => (
    <ScrollView>
      {data.map((student, index) => renderTableRow(student, index))}
    </ScrollView>
  );

  return (
    <ScrollView contentContainerStyle={styles.userContainer}>
      <View style={styles.tableContainer}>
        <Text style={styles.tableLabel}>Student Information</Text>
        <ScrollView horizontal={true}>
          <View>
            {renderTableHeader()}
            {renderTable()}
          </View>
        </ScrollView>
      </View>
      <View style={{ alignItems: 'center', marginTop: 100 }}>
        <TouchableOpacity style={styles.modalButton} onPress={navigateToAddPage}>
          <Text style={styles.modalButtonText}>Back</Text>
        </TouchableOpacity>
      </View>

      <Modal transparent={true} visible={!!selectedStudent} onRequestClose={handleCloseModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ marginBottom: 30 }}>Student Information</Text>
            <Text style={styles.modalText}>Firstname: {selectedStudent?.FirstName}</Text>
            <Text style={styles.modalText}>Lastname: {selectedStudent?.LastName}</Text>
            <Text style={styles.modalText}>Course: {selectedStudent?.Course}</Text>
            <View style={{ marginTop: 30 }}>
              <Text style={styles.modalText}>Username: {selectedStudent?.Username}</Text>
              <Text style={styles.modalText}>Password: {selectedStudent?.Password}</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  tableContainer: {
    alignItems: 'center',
    width: '80%',
    height: 500
  },
  tableLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    borderBottomWidth: 1,
    padding: 10,
  },
  tableData: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#ecf0f1',
    borderBottomWidth: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 300
  },
  modalText: {
    marginBottom: 10,
  },
  modalButton: {
    width: 150,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  modalButtonText: {
    color: '#fff',   
    textAlign: 'center', 
    fontFamily: 'Roboto-Italic'
  },
});

export default TableTab;
