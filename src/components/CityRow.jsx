import styles from "./CityRow.module.css";

function CityRow({item}) {
  return (
    <tr data-testid="countries-container" className={styles.container}>
      <td> {item.id}. </td>
      <td> {item.name} </td>
      <td> {item.country} </td>
      <td> {item.population} </td>
    </tr>
  );
}

export default CityRow;
