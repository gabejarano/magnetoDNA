# magnetoDNA- Reto Mercado libre

Proyecto realizado con node utilizando el framework Express. Se ha creado un API rest que permite ejecutar el reto propuesto. Se ha utilizado servicios de AWS para el despliegue del servicio Web. Mas precisamente se utilizo una instancia de EC2 y Dynamo DB como base de datos NoSQL.

Documentacion API REST.

**url**: ec2-3-83-111-83.compute-1.amazonaws.com:63671/api/

***POST /MUTANT***

**ec2-3-83-111-83.compute-1.amazonaws.com:63671/api/mutant**

**Request Body**

{

  “dna”:["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
  
}

**Responses**

*Status 200*

{
	"message": "Is Mutant!"
}

*Status 403*

{
	"message": "Is Human!"
}

*Status 400*

{
	"message": "DNA must be a square matrix"
}

#

***GET /STATS***

**ec2-3-83-111-83.compute-1.amazonaws.com:63671/api/stats**


**Responses**

*Status 200*

{
	"count_mutant_dna": number,
	"count_human_dna": number,
	"ratio": number
}

# Testing coverage

Para las pruebas unitarias se ha utilzado la libreria Jest, acontinuacion adjunto pantallazo con el porcentaje de coverage.

![coverage test](https://user-images.githubusercontent.com/35774066/177674586-bf346054-40cd-4b28-8ee7-7230c9a6e480.png)


