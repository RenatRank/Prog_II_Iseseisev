### RESSURSID
[API ressursid](https://github.com/RenatRank/Prog_II_Iseseisev/blob/main/apidocs/API_ER%20diagram.png)


### ENDPOINDID

#### Serveritöö
Serveri olek: GET /api/v1/health/

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