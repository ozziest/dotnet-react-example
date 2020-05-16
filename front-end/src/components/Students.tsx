import React from 'react';
import Navigation from './shared/Navigation';
import ColumnFilter from './shared/ColumnFilter';

export default () => {
  return (
    <div>
      <h2>
        Öğrenciler
        <button className="btn btn-success float-right">
          Ekle
        </button>
      </h2>

      <hr />

      <table className="table table-border">
        <thead>
          <tr>
            <th className="row-count">#</th>
            <th>No <ColumnFilter></ColumnFilter></th>
            <th>Ad <ColumnFilter></ColumnFilter></th>
            <th>Soyad <ColumnFilter></ColumnFilter></th>
            <th>Şube <ColumnFilter></ColumnFilter></th>
            <th>Dersler <ColumnFilter></ColumnFilter></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>23</td>
            <td>Özgür</td>
            <td>Işıklı</td>
            <td>12-BT</td>
            <td>3</td>
          </tr>
        </tbody>
      </table>

      <div>
        245 kayıt arasından 1-10 arasındakiler gösteriliyor.
        <Navigation></Navigation>
      </div>
    </div>
  );
}
