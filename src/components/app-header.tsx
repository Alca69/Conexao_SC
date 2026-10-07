import { router, usePathname, type Href } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const sections: { label: string; href: Href; description: string }[] = [
  { label: 'Notícias', href: '/', description: 'Informação e comunidade' },
  { label: 'Finanças', href: '/financas', description: 'Organização do dia a dia' },
  { label: 'Moradia', href: '/moradia', description: 'Um lugar para chamar de lar' },
  { label: 'Documentação', href: '/documentacao', description: 'Informações importantes' },
];

export function AppHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <View style={styles.header}>
        <View style={styles.brand}>
          <View style={styles.mark}><Text style={styles.markText}>SC</Text></View>
          <View><Text style={styles.brandTitle}>conexão<Text style={styles.brandAccent}> sc</Text></Text><Text style={styles.tagline}>INFORMAÇÃO QUE ACOLHE</Text></View>
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel="Abrir menu de navegação" accessibilityState={{ expanded: open }} onPress={() => setOpen(true)} style={styles.menuButton}>
          <View style={styles.menuLine} /><View style={styles.menuLine} /><View style={styles.menuLine} />
        </Pressable>
      </View>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <View style={styles.overlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)} accessibilityRole="button" accessibilityLabel="Fechar menu" />
          <SafeAreaView style={styles.drawer} accessibilityViewIsModal>
            <View style={styles.drawerHeading}><Text style={styles.drawerTitle}>Explore o Conexão SC</Text><Pressable accessibilityRole="button" accessibilityLabel="Fechar menu" onPress={() => setOpen(false)} style={styles.close}><Text style={styles.closeText}>×</Text></Pressable></View>
            <ScrollView>
              <Text style={styles.drawerSubtitle}>Seu ponto de encontro em Santa Catarina.</Text>
              {sections.map((section) => (
                <Pressable key={section.label} accessibilityRole="link" accessibilityState={{ selected: pathname === section.href }} onPress={() => { setOpen(false); router.navigate(section.href); }} style={[styles.navItem, pathname === section.href && styles.active]}>
                  <View style={styles.navCopy}><Text style={styles.navTitle}>{section.label}</Text><Text style={styles.navDescription}>{section.description}</Text></View><Text style={styles.arrow}>›</Text>
                </Pressable>
              ))}
            </ScrollView>
            <Text style={styles.drawerFooter}>Pertencer começa com uma conexão.</Text>
          </SafeAreaView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingVertical: 14, backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#E6EAE9' },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 1 },
  mark: { width: 38, height: 38, borderRadius: 12, backgroundColor: '#146D5C', alignItems: 'center', justifyContent: 'center' },
  markText: { color: '#FFF', fontSize: 16, fontWeight: '800' },
  brandTitle: { color: '#122B32', fontSize: 23, fontWeight: '800', letterSpacing: -0.8 },
  brandAccent: { color: '#146D5C' },
  tagline: { color: '#5C7073', fontSize: 8, letterSpacing: 1.8, marginTop: 3 },
  menuButton: { minWidth: 48, minHeight: 48, justifyContent: 'center', alignItems: 'center', gap: 5 },
  menuLine: { height: 2, width: 23, borderRadius: 2, backgroundColor: '#122B32' },
  overlay: { flex: 1, backgroundColor: 'rgba(7, 25, 29, 0.55)', alignItems: 'flex-end' },
  drawer: { backgroundColor: '#FFF', width: '88%', maxWidth: 380, flex: 1, paddingHorizontal: 24 },
  drawerHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, gap: 8 },
  drawerTitle: { flex: 1, fontSize: 21, fontWeight: '700', color: '#122B32' },
  close: { minWidth: 48, minHeight: 48, alignItems: 'center', justifyContent: 'center' },
  closeText: { color: '#122B32', fontSize: 32 },
  drawerSubtitle: { color: '#65777A', fontSize: 15, lineHeight: 23, marginTop: 16, marginBottom: 30 },
  navItem: { padding: 16, borderRadius: 14, marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 12 },
  active: { backgroundColor: '#E7F3EF' },
  navCopy: { flex: 1 },
  navTitle: { color: '#122B32', fontSize: 19, fontWeight: '700' },
  navDescription: { color: '#65777A', fontSize: 13, marginTop: 6 },
  arrow: { color: '#146D5C', fontSize: 28 },
  drawerFooter: { color: '#65777A', fontSize: 13, paddingVertical: 24 },
});
