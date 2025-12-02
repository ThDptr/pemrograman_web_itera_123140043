from pyramid.view import view_config
from sqlalchemy.exc import DBAPIError, IntegrityError

from ..models import Matakuliah


@view_config(route_name='matakuliah_collection', renderer='json', request_method='GET')
def get_all_matakuliah(request):
    """Mendapatkan semua matakuliah"""
    try:
        matakuliah_list = request.dbsession.query(Matakuliah).all()
        return {
            'matakuliah': [mk.to_dict() for mk in matakuliah_list]
        }
    except DBAPIError as e:
        request.response.status = 500
        return {'error': 'Database error occurred'}


@view_config(route_name='matakuliah_resource', renderer='json', request_method='GET')
def get_matakuliah(request):
    """Mendapatkan detail satu matakuliah"""
    try:
        matakuliah_id = int(request.matchdict['id'])
        matakuliah = request.dbsession.query(Matakuliah).filter(
            Matakuliah.id == matakuliah_id
        ).first()
        
        if matakuliah is None:
            request.response.status = 404
            return {'error': 'Matakuliah tidak ditemukan'}
        
        return matakuliah.to_dict()
    except ValueError:
        request.response.status = 400
        return {'error': 'ID tidak valid'}
    except DBAPIError:
        request.response.status = 500
        return {'error': 'Database error occurred'}


@view_config(route_name='matakuliah_collection', renderer='json', request_method='POST')
def create_matakuliah(request):
    """Menambahkan matakuliah baru"""
    try:
        data = request.json_body
        
        # Validasi data
        required_fields = ['kode_mk', 'nama_mk', 'sks', 'semester']
        for field in required_fields:
            if field not in data:
                request.response.status = 400
                return {'error': f'Field {field} diperlukan'}
        
        # Buat matakuliah baru
        matakuliah = Matakuliah(
            kode_mk=data['kode_mk'],
            nama_mk=data['nama_mk'],
            sks=int(data['sks']),
            semester=int(data['semester'])
        )
        
        request.dbsession.add(matakuliah)
        request.dbsession.flush()
        
        request.response.status = 201
        return {
            'message': 'Matakuliah berhasil ditambahkan',
            'data': matakuliah.to_dict()
        }
        
    except IntegrityError:
        request.dbsession.rollback()
        request.response.status = 400
        return {'error': 'Kode matakuliah sudah ada'}
    except (ValueError, KeyError) as e:
        request.response.status = 400
        return {'error': 'Data tidak valid'}
    except DBAPIError:
        request.response.status = 500
        return {'error': 'Database error occurred'}


@view_config(route_name='matakuliah_resource', renderer='json', request_method='PUT')
def update_matakuliah(request):
    """Mengupdate data matakuliah"""
    try:
        matakuliah_id = int(request.matchdict['id'])
        data = request.json_body
        
        matakuliah = request.dbsession.query(Matakuliah).filter(
            Matakuliah.id == matakuliah_id
        ).first()
        
        if matakuliah is None:
            request.response.status = 404
            return {'error': 'Matakuliah tidak ditemukan'}
        
        # Update fields jika ada
        if 'kode_mk' in data:
            matakuliah.kode_mk = data['kode_mk']
        if 'nama_mk' in data:
            matakuliah.nama_mk = data['nama_mk']
        if 'sks' in data:
            matakuliah.sks = int(data['sks'])
        if 'semester' in data:
            matakuliah.semester = int(data['semester'])
        
        request.dbsession.flush()
        
        return {
            'message': 'Matakuliah berhasil diupdate',
            'data': matakuliah.to_dict()
        }
        
    except IntegrityError:
        request.dbsession.rollback()
        request.response.status = 400
        return {'error': 'Kode matakuliah sudah ada'}
    except ValueError:
        request.response.status = 400
        return {'error': 'Data tidak valid'}
    except DBAPIError:
        request.response.status = 500
        return {'error': 'Database error occurred'}


@view_config(route_name='matakuliah_resource', renderer='json', request_method='DELETE')
def delete_matakuliah(request):
    """Menghapus data matakuliah"""
    try:
        matakuliah_id = int(request.matchdict['id'])
        
        matakuliah = request.dbsession.query(Matakuliah).filter(
            Matakuliah.id == matakuliah_id
        ).first()
        
        if matakuliah is None:
            request.response.status = 404
            return {'error': 'Matakuliah tidak ditemukan'}
        
        request.dbsession.delete(matakuliah)
        request.dbsession.flush()
        
        return {'message': 'Matakuliah berhasil dihapus'}
        
    except ValueError:
        request.response.status = 400
        return {'error': 'ID tidak valid'}
    except DBAPIError:
        request.response.status = 500
        return {'error': 'Database error occurred'}
