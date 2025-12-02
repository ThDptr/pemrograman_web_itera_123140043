def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    
    # API routes untuk matakuliah
    config.add_route('matakuliah_collection', '/api/matakuliah')
    config.add_route('matakuliah_resource', '/api/matakuliah/{id}')
