1. Fix subField on FieldFactories
  a. wrongly type agnostic

2. Complete the other Expression Factories
  a. Keep style similar to DateexpressionFactory
  b. Complete an FieldFactories that are related to each

3. Implement Paramerteriztion for Filters
  a. Including error checking

4. Determine implementation of Filter members
  a. I.e. how the other classes connect to the Filter Class

6. Complete the AcumaticaError type
  a. Including its three verbosity levels

7. Implement AcumaticaError into the AcumaticaClient
  a. Each function will get a parameter for the desired error verbosity

5. Implement alternative session types
  a. Per application
  b. Per call
  c. Reimplement GIs to skip the login endpoint
    i. Probably make it optional
