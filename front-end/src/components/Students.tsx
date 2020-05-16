import React from 'react';
import Navigation from './shared/Navigation';

export default () => {
  return (
    <div>
      <h2>
        Öğrenciler
        <button className="btn btn-success float-right">
          Ekle
        </button>
      </h2>

      <table className="table table-border">
        <thead>
          <tr>
            <th>No</th>
            <th>Ad</th>
            <th>Soyad</th>
            <th>Şube</th>
            <th>Dersler</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
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
