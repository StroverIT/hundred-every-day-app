import Auth from "@/components/Auth";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Register = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Auth isRegister={true} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
});

export default Register;
