# Programmeerimine II kursuse iseseisva töö repositoorium

## Tunniplaani projekt
### Sisaldab järgmisi ressursse:
1) kasutajad - õppejõud/tunniplaani sisestaja
- nimekirja lugemine
- lugemine ID alusel
- loomine
- kustutamine
- muutmine

2) õppeaine - nimetus, --> kursus
- nimekirja lugemine
- loomine
- kustutamine
- muutmine

3) õppejõud - nimi, email, --> antav õppeaine
- nimekirja lugemine
- loomine
- kustutamine
- muutmine

4) kursus - eriala nimetus  --> õpitavad ained
- nimekirja lugemine
- loomine
- kustutamine
- muutmine



## API DOKUMENTATSIOON

### ENDPOINDID

#### Kasutajad
- Kasutajate nimekirja päring: GET /api/v1/users/
- Kasutaja päring id alusel: GET /api/v1/users/:id/
- Kasutaja loomine: POST /api/v1/users/
- Kasutaja muutmine: PATCH /api/v1/users/:id/
- Kasutaja kustutamine: DELETE /api/v1/users/:id/

#### Kursused
- Kursuste nimekiri GET /api/v1/courses/
- Kursuse loomine POST /api/v1/courses/
- Kursuse muutmine: PATCH /api/v1/courses/:id/
- Kursuse kustutamine: DELETE /api/v1/courses/:id/

#### Õppeained
- Õppeainete nimekiri GET /api/v1/subjects/
- Õppeaine loomine POST /api/v1/subjects/
- Õppeaine muutmine: PATCH /api/v1/subjects/:id/
- Õppeaine kustutamine: DELETE /api/v1/subjects/:id/

#### Ruumid
- Ruumide nimekiri GET /api/v1/rooms/
- Ruumide loomine POST /api/v1/rooms/
- Ruumide muutmine: PATCH /api/v1/rooms/:id/
- Ruumide kustutamine: DELETE /api/v1/rooms/:id/